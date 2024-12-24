import { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { Edit, Loader, Plus, Trash2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

import useUser from "@/hooks/use-user";
import axiosService from "@/axios";

const UserAddress = () => {
  const queryClient = useQueryClient();
  const { data: user } = useUser();

  const [open, setOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");

  const [addressField, setAddressField] = useState({
    alias: "",
    street: "",
    state: "",
    lga: "",
    address: "",
  });

  const handleSetAddress = (event) => {
    const { name, value } = event.target;
    setAddressField({ ...addressField, [name]: value });
  };

  const addressMutation = useMutation({
    mutationFn: async (fields) => {
      const response = await axiosService.post("/user/address", fields);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Address successfully added");
      setOpen(false);
      queryClient.invalidateQueries(["user"]);
    },
  });
  const deleteAddressMutation = useMutation({
    mutationFn: async (addressId) => {
      await axiosService.delete(`/user/address/${addressId}`);
    },
    onSuccess: () => {
      toast.success("Address deleted successfully.");
      queryClient.invalidateQueries(["user"]);
      setDelOpen(false);
    },
  });

  const handleAddressSubmit = () => {
    if (
      addressField.alias === "" ||
      addressField.street === "" ||
      state === "" ||
      lga === "" ||
      addressField.address === ""
    ) {
      return toast.warning("All fields are required");
    }
    addressMutation.mutate({ ...addressField, lga, state });
  };

  const handleAddressDelete = useCallback(
    (addressId) => {
      if (!addressId) return;
      deleteAddressMutation.mutate(addressId);
    },
    [deleteAddressMutation]
  );
  return (
    <>
      <Helmet>
        <title>User Address</title>
        <meta
          name="description"
          content="Address page for Double Decent Superstores"
        />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <Card className="mx-1">
        <CardHeader>
          <CardTitle>Address</CardTitle>
          <CardDescription className="flex justify-between items-center">
            <div>
              Update your delivery address here. Click save when you&apos;re done.
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button size="sm" type="button">
                        <Plus />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add address</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add address</DialogTitle>
                  <DialogDescription className="text-start">
                    <section className="grid grid-cols-2 items-baseline gap-2 space-y-2">
                      <div className="space-y-1 col-span-2 md:col-span-1">
                        <Label htmlFor="alias">Alias</Label>
                        <Input
                          id="alias"
                          placeholder="eg Home, Work etc"
                          name="alias"
                          onChange={handleSetAddress}
                          value={addressField.alias}
                        />
                      </div>
                      <div className="space-y-1 col-span-2 md:col-span-1">
                        <Label htmlFor="street">Street</Label>
                        <Input
                          id="street"
                          defaultValue="123 Main St"
                          name="street"
                          onChange={handleSetAddress}
                          value={addressField.street}
                        />
                      </div>
                      <div className="space-y-1 col-span-2 md:col-span-1">
                        <Select
                          onValueChange={(value) => setState(value)}
                          name="state"
                          value={state}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>States</SelectLabel>
                              <SelectItem value="lagos" selected>
                                Lagos state
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1 col-span-2 md:col-span-1">
                        <Select
                          onValueChange={(lga) => setLga(lga)}
                          name="lga"
                          value={lga}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose LGA" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>LGA</SelectLabel>
                              <SelectItem value="ikorodu">Ikorodu</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1 col-span-2">
                        <Label htmlFor="address">Full address</Label>
                        <Textarea
                          id="address"
                          placeholder="9, NBC road, Ebute, Ikorodu, Lagos State."
                          name="address"
                          onChange={handleSetAddress}
                          value={addressField.address}
                        />
                      </div>
                    </section>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddressSubmit}>
                    {addressMutation.isPending ? (
                      <div className="flex items-center">
                        <Loader /> <i>Loading...</i>
                      </div>
                    ) : (
                      "Save Address"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user.location.length === 0 ? (
            <div className="flex items-center justify-center">
              <p className="text-lg font-semibold text-slate-700">
                No location is set yet!
              </p>
            </div>
          ) : (
            <section className="flex gap-4 flex-wrap">
              {user.location.map((add, index) => (
                <div
                  className="border p-2 rounded relative max-w-sm min-w-[200px]"
                  key={index}
                >
                  <span className="absolute right-2 cursor-pointer flex gap-2 items-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Edit size={18} color="orange" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit Address</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Dialog open={delOpen} onOpenChange={setDelOpen}>
                      <DialogTrigger>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Trash2 size={18} color="red" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-red-500">
                              <p>Delete Address</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete this address from your account.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            onClick={() => setDelOpen(false)}
                            variant="outline"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            onClick={() => handleAddressDelete(add._id)}
                            variant="destructive"
                          >
                            {deleteAddressMutation.isPending ? (
                              <div className="flex items-center gap-2">
                                <Loader /> <i>Loading...</i>
                              </div>
                            ) : (
                              "Delete"
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </span>
                  <h5 className="capitalize">
                    <span className="font-semibold text-slate-700">Alias</span>:{" "}
                    {add.alias}
                  </h5>
                  <div className="capitalize">
                    <span className="font-semibold text-slate-700">Street</span>{" "}
                    : {add.street}
                  </div>
                  <div className="capitalize">
                    <span className="font-semibold text-slate-700">LGA</span>:{" "}
                    {add.lga}
                  </div>
                  <div className="capitalize">
                    <span className="font-semibold text-slate-700">State</span>:{" "}
                    {add.state} state
                  </div>
                  <div className="capitalize">
                    <span className="font-semibold text-slate-700">
                      Full address
                    </span>
                    : {add.address}
                  </div>
                </div>
              ))}
            </section>
          )}
          {/* <ScrollBar orientation="horizontal" />
                  </ScrollArea> */}
        </CardContent>
        {/* <CardFooter>
                  <Button onClick={handleAddressSubmit}>Save address</Button>
                </CardFooter> */}
      </Card>
    </>
  );
};

export default UserAddress;
