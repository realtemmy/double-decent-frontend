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

import AddressDialog from "../address-dialog/AddressDialog";
import useUser from "@/hooks/use-user";
import axiosService from "@/axios";

const UserAddress = () => {
  const queryClient = useQueryClient();
  const { data: user } = useUser();

  const [open, setOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

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
  const editAddressMutation = useMutation({
    mutationFn: async (fields) => {
      const response = await axiosService.patch(
        `/user/address/${selectedAddress._id}`,
        fields
      );
      console.log(response);
    },
    onSuccess: () => {
      toast.success("Address updated successfully.");
      queryClient.invalidateQueries(["user"]);
      setEditOpen(false);
    },
    onError: () => {
      toast.error("There was an error updating address");
    },
  });

  const handleAddressSubmit = (addressField) => {
    if (
      addressField.alias === "" ||
      addressField.street === "" ||
      addressField.state === "" ||
      addressField.lga === "" ||
      addressField.address === ""
    ) {
      return toast.warning("All fields are required");
    }
    addressMutation.mutate(addressField);
  };

  const handleAddressDelete = useCallback(
    (addressId) => {
      if (!addressId) return;
      deleteAddressMutation.mutate(addressId);
    },
    [deleteAddressMutation]
  );

  const handleAddressEdit = useCallback(
    (fields) => {
      editAddressMutation.mutate(fields);
    },
    [editAddressMutation]
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
              Update your delivery address here. Click save when you&apos;re
              done.
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button size="sm" type="button" onClick={() => setOpen(true)}>
                    <Plus />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add address</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* Create/Add address */}
            <AddressDialog
              isOpen={open}
              onClose={setOpen}
              onSubmit={handleAddressSubmit}
              isLoading={addressMutation.isPending}
            />
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
                        <TooltipTrigger asChild>
                          <Edit
                            color="orange"
                            size={18}
                            onClick={() => {
                              setSelectedAddress(add); // Set the selected address
                              setEditOpen(true); // Open the dialog
                            }}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Add to library</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {/* Edit address */}
                    <AddressDialog
                      isOpen={editOpen}
                      onClose={setEditOpen}
                      initialData={selectedAddress}
                      isLoading={editAddressMutation.isPending}
                      onSubmit={handleAddressEdit}
                    />

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
                  <div className="capitalize">
                    <span className="font-semibold text-slate-700">Alias</span>:{" "}
                    {add.alias}
                  </div>
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
        </CardContent>
      </Card>
    </>
  );
};

export default UserAddress;
