import { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { commaSeparatedPrice } from "@/utils/helperFunctions";
import useUser from "@/hooks/use-user";

import { toast } from "sonner";
import axios from "axios";
import { Loader2, MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";
import axiosService from "@/axios";
import { Input } from "@/components/ui/input";

const Checkout = () => {
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const [coords, setCoords] = useState(null);
  // Use google map for current location?
  const { data: user, isLoading: userLoading, error } = useUser();

  const [address, setAddress] = useState(user.location[0]);

  const {
    data: mapAddress,
    isLoading: addressLoading,
    error: errorAddress,
  } = useQuery({
    queryKey: coords ? ["address", coords.latitude, coords.longitude] : null,
    queryFn: async () => {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}`;
      const { data } = await axios.get(url);

      return {
        address: data.display_name,
        latitude: data.lat,
        longitude: data.lon,
        state: data.address.state,
        lga: data.address.county,
        street: data.address.road,
      };
    },
    enabled: !!coords, // Only fetch when coords is available
    onError: (error) => {
      console.error("Error fetching address:", error);
      toast.error("Failed to retrieve the address.");
    },
  });

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude and Longitude:", latitude, longitude);
          setCoords({ latitude, longitude }); // Trigger React Query
        },
        (error) => {
          toast.error(
            "Unable to retrieve your location. Please allow location access."
          );
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosService.post(
        "/order/paystack-checkout",
        data
      );
      console.log(response);
      return response;
    },
    onSuccess: (data) => {
      window.location.href = data.url;
    },
  });

  const handleCheckout = () => {
    if (!user.email || !(address || mapAddress?.address) || !user.phone) {
      console.log(user.email, address, mapAddress?.address, user.phone);

      return toast.warning("Please fill in all required fields");
    }
    mutation.mutate({
      cartItems,
      phone: user.phone,
      email: user.email,
      address: address || mapAddress.address,
      deliveryFee: 700,
    });
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 />
      </div>
    );
  }

  const handleAddressChange = (value) => {
    setAddress(value);
  };

  return (
    <div className="font-[sans-serif] bg-white">
      <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
        <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
          <div className="relative h-full">
            <ScrollArea className="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div className="flex items-start gap-4" key={index}>
                    <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-300 rounded-md">
                      <img src={item.image} className="w-full object-contain" />
                    </div>
                    <div className="w-full">
                      <h3 className="text-base text-white capitalize">
                        {item.name}
                      </h3>
                      <ul className="text-xs text-gray-300 space-y-2 mt-2">
                        <li>
                          Price
                          <span className="float-right">
                            {commaSeparatedPrice(item.price)}
                          </span>
                        </li>
                        <li>
                          Quantity{" "}
                          <span className="float-right">{item.quantity}</span>
                        </li>
                        <li>
                          Total Price{" "}
                          <span className="float-right">
                            {commaSeparatedPrice(item.price * item.quantity)}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="md:absolute md:left-0 md:bottom-0 bg-gray-800 w-full p-4">
              <p className="text-white">Delivery Fee:</p>
              <h4 className="flex flex-wrap gap-4 text-base text-white">
                Total{" "}
                <span className="ml-auto">
                  {commaSeparatedPrice(totalPrice)}
                </span>
              </h4>
            </div>
          </div>
        </div>

        <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
          <h2 className="text-2xl font-bold text-gray-800">
            Complete your order
          </h2>
          <form className="mt-8">
            <div>
              <h3 className="text-base text-gray-800 mb-4">Personal Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Input
                    type="text"
                    placeholder="First Name"
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    value={user?.name}
                    disabled
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    value={user?.email}
                    disabled
                  />
                </div>

                <div>
                  <Input
                    type="number"
                    placeholder="Phone No."
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    value={user?.phone}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-baseline">
                <h3 className="text-base text-gray-800 mb-4">
                  Shipping Address
                </h3>

                <Dialog>
                  <DialogTrigger>
                    <Button
                      variant="secondary"
                      className="rounded border"
                      type="button"
                      onClick={getCurrentLocation}
                    >
                      Use current location?
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        {addressLoading ? (
                          <div className="text-center flex items-center justify-center h-full">
                            <Loader2 />
                          </div>
                        ) : errorAddress ? (
                          <div>There was an error: {errorAddress.message}</div>
                        ) : (
                          <div>
                            <div>
                              <span className="font-semibold text-slate-700">
                                Street
                              </span>
                              : {mapAddress?.street}
                            </div>
                            <div>
                              <span className="font-semibold text-slate-700">
                                LGA
                              </span>
                              : {mapAddress?.lga}
                            </div>
                            <div>
                              <span className="font-semibold text-slate-700">
                                State
                              </span>
                              : {mapAddress?.state}
                            </div>
                            <div>
                              <span className="font-semibold text-slate-700">
                                Full address
                              </span>
                              : {mapAddress?.address}
                            </div>
                          </div>
                        )}
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button type="submit" size="sm">
                        Use address
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <section>
                <RadioGroup
                  defaultValue={user.location[0]}
                  onValueChange={handleAddressChange}
                >
                  {user.location.length === 0 ? (
                    <div className="text-center pb-2">
                      No address set yet, set address
                      <Link
                        to="/user"
                        variant="link"
                        className="p-1 text-orange-500 hover:underline hover:text-orange-400"
                      >
                        here
                      </Link>{" "}
                      or use{" "}
                      <Button
                        variant="secondary"
                        className="rounded border"
                        type="button"
                        size="sm"
                        onClick={getCurrentLocation}
                      >
                        Use current location?
                      </Button>
                      .
                    </div>
                  ) : (
                    user.location.map((location, index) => (
                      <div
                        className="flex items-baseline space-x-2 rounded-md border p-2"
                        key={index}
                      >
                        <RadioGroupItem
                          value={location}
                          id={`option-${index}`}
                        />
                        <Label
                          htmlFor={`option-${index}`}
                          className="text-base"
                        >
                          <h5 className="font-semibold text-slate-600">
                            {location.alias} - {location.street}
                          </h5>
                          <p>{location.address}</p>
                          <p className="text-sm text-slate-500">
                            {location.state}, {location.lga}
                          </p>
                        </Label>
                      </div>
                    ))
                  )}
                </RadioGroup>
              </section>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-base font-semibold text-slate-700 px-2">
                    Add new delivery Information
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="col-span-2 md:col-span-1">
                        <Label htmlFor="alias" className="text-slate-600">
                          Alias
                        </Label>
                        <Input
                          type="text"
                          id="alias"
                          placeholder="eg Home, Work"
                          className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                        />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <Label htmlFor="street" className="text-slate-600">
                          Street
                        </Label>
                        <Input
                          type="text"
                          id="street"
                          placeholder="Teacher's estate"
                          className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                        />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="State" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Lagos</SelectItem>
                            <SelectItem value="dark">Ogun</SelectItem>
                            <SelectItem value="system">Oyo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="LGA" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Ikorodu</SelectItem>
                            <SelectItem value="dark">Ketu</SelectItem>
                            <SelectItem value="system">Yaba / Akoka</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="address" className="text-slate-600">
                          Full address
                        </Label>
                        <Textarea placeholder="3, Omobolanle Adebowale avenue, Lagoon view estate, Ikorodu." />
                      </div>
                      <div className="text-right col-span-2">
                        <Button type="button">Add address</Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="flex gap-4 max-md:flex-col mt-8">
                <Button
                  type="button"
                  className="rounded-md px-6 py-3 w-full text-sm tracking-wide max-md:order-1"
                  variant="secondary"
                >
                  <MoveLeft />
                  Return to Cart
                </Button>
                <Button
                  type="button"
                  className="rounded-md px-6 py-3 w-full text-sm tracking-wide"
                  onClick={handleCheckout}
                >
                  {mutation.isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Complete Purchase"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
