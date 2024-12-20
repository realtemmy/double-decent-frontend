import { useState } from "react";
import {
  ChevronRight,
  CircleHelp,
  LogOut,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Footer from "../Footer/Footer";
import useUser from "@/hooks/use-user";
import axiosService from "@/axios";

import Spinner from "../Spinner/Spinner";
import Logo from "../Logo/Logo";
import defaultUser from "./../../assets/default.jpg";

function MainLayout() {
  const navigate = useNavigate("");
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [dialOpen, setDialOpen] = useState(false);
  const { cartCount } = useSelector((state) => state.cart);
  const [categoryId, setCategoryId] = useState("");
  const [search, setSearch] = useState("");

  const handleClose = () => setOpen(false);

  const {
    data: user = null,
    error: userError,
    isLoading: userLoading,
  } = useUser();

  // console.log("User: ", user);

  const {
    isLoading,
    error,
    data: categories = [],
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await axiosService.get("/category");
      return response.data;
    },
  });

  const {
    data: sections = [],
    isLoading: secLoading,
    error: secError,
  } = useQuery({
    queryKey: ["category sections", categoryId],
    queryFn: async () => {
      const response = await axiosService.get(
        `/category/${categoryId}/section`
      );
      return response.data;
    },
    enabled: !!categoryId,
  });

  const handleChange = (value) => {
    setCategoryId(value);
  };
  const handleCartNavigate = () => {
    navigate("/cart");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate(`/products?search=${search.replace(" ", "-")}`);
    }
  };

  const handleLogout = () => {
    setDialOpen(false);
    queryClient.removeQueries(["user"]);
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error || secError) {
    return <div>There was an error fetching data</div>;
  }
  return (
    <>
      {isLoading && <Spinner />}
      <header className="h-fit w-full shrink-0 items-center px-4 md:px-6">
        <div className="flex items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <div className="lg:hidden ms-2 flex justify-between items-center w-full my-2">
              <Link to="/">
                <Logo />
              </Link>
              <Input
                type="text"
                className="hidden md:block w-full max-w-lg mx-2"
                placeholder="Search for groceries, accessories and more..."
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="flex items-center gap-4">
                {user ? (
                  <Dialog open={dialOpen} onOpenChange={setDialOpen}>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="border-none outline-none">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.photo || defaultUser} />
                          <AvatarFallback>
                            {user?.name ? user.name[0].toUpperCase() : "?"}
                          </AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-52">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => navigate("/user/profile")}
                        >
                          Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => navigate("/user/orders")}
                        >
                          Orders
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => navigate("/user/address")}
                        >
                          Delivery address
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-red-100 bg-red-50">
                          <DialogTrigger asChild className="w-full">
                            <span className="flex cursor-pointer items-center">
                              <LogOut color="red" />
                              <span className="text-red-700 hover:text-red-600 ml-2">
                                Logout
                              </span>
                            </span>
                          </DialogTrigger>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Are you sure you want to Logout?
                        </DialogTitle>
                        <DialogDescription>
                          This will clear your session, you will be logged out
                          and redirected to the login page.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="flex justify-end gap-4 mt-4">
                        <Button
                          type="submit"
                          variant="destructive"
                          onClick={handleLogout}
                        >
                          Logout
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-slate-700 font-semibold hover:text-slate-600 hover:underline text-sm"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="text-slate-700 font-semibold hover:text-slate-600 hover:underline text-sm"
                    >
                      Signup
                    </Link>
                  </>
                )}
                <div
                  className="relative cursor-pointer"
                  onClick={handleCartNavigate}
                >
                  <ShoppingCart color="orange" />
                  <sup className="absolute -top-1 -right-1 text-white font-semibold bg-orange-500 border p-1 py-2 rounded-full min-w-[20px] text-center">
                    {cartCount}
                  </sup>
                </div>
              </div>
            </div>

            {/* Sidebar content */}
            <SheetContent side="left" className="px-0">
              <ScrollArea className="h-[calc(100vh-20px)] rounded-md mt-1 pb-3">
                <Link to="/" className="mr-6 hidden lg:flex">
                  <MountainIcon className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>

                {user && (
                  <div className="grid gap-2 py-6 w-full">
                    <h4
                      className="text-white px-3 font-semibold text-lg py-1 capitalize hover:cursor-pointer"
                      style={{
                        backgroundColor: "#C74E00",
                      }}
                    >
                      {user.name}&#39;s account
                    </h4>
                    <div className="ms-4">
                      <Link
                        to="/user/profile"
                        className="flex justify-between items-center me-4 hover:text-slate-700 text-slate-900 my-2 px-1"
                        onClick={() => setOpen(false)}
                      >
                        <span>User profile</span>
                        <ChevronRight size={20} />
                      </Link>
                      <Link
                        to="/user/orders"
                        className="flex justify-between items-center me-4 hover:text-slate-700 text-slate-900 my-2 px-1"
                        onClick={() => setOpen(false)}
                      >
                        <span>Order history</span>
                        <ChevronRight size={20} />
                      </Link>
                      <Link
                        to="/user/address"
                        className="flex justify-between items-center me-4 hover:text-slate-700 text-slate-900 my-2 px-1"
                        onClick={() => setOpen(false)}
                      >
                        <span>Delivery address</span>
                        <ChevronRight size={20} />
                      </Link>
                    </div>
                  </div>
                )}

                <div className="grid gap-2 py- w-full">
                  <h4
                    className="text-white px-1 font-semibold text-xl py-1 hover:cursor-pointer"
                    style={{
                      backgroundColor: "#C74E00",
                    }}
                  >
                    Categories
                  </h4>
                  <Accordion
                    type="single"
                    collapsible
                    onValueChange={handleChange}
                    className="px-3 m-0"
                  >
                    {categories.map((category, index) => (
                      <AccordionItem value={category.id} key={index}>
                        <AccordionTrigger className="capitalize">
                          {category.name}
                        </AccordionTrigger>
                        <AccordionContent>
                          {secLoading ? (
                            <div>Loading...</div>
                          ) : sections.length === 0 ? (
                            <div>No section under category</div>
                          ) : (
                            sections.map((section) => (
                              <Link
                                key={section._id}
                                to={`/section/${section.slug}`}
                                onClick={handleClose}
                                className="hover:underline hover:text-slate-600 capitalize block py-1"
                              >
                                {section.name}
                              </Link>
                            ))
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
                <Link
                  to="/help"
                  className="px-3 font-semibold my-2 text-lg py-1 capitalize block hover:cursor-pointer text-white hover:text-white"
                  style={{
                    backgroundColor: "#C74E00",
                  }}
                >
                  Help
                </Link>
                <Link
                  to="/help"
                  className="px-3 font-semibold my-2 text-lg py-1 capitalize block hover:cursor-pointer text-white hover:text-white"
                  style={{
                    backgroundColor: "#C74E00",
                  }}
                >
                  FAQ
                </Link>
                <Link
                  to="/contact-us"
                  className="px-3 font-semibold my-2 text-lg py-1 capitalize block hover:cursor-pointer text-white hover:text-white"
                  style={{
                    backgroundColor: "#C74E00",
                  }}
                >
                  Contact us
                </Link>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex justify-center mb-2">
          <Input
            type="text"
            className="md:hidden w-full max-w-lg mx-2 text-xs"
            placeholder="Search for groceries, accessories and more..."
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* Desktop */}
        <nav className="hidden lg:grid grid-cols-[150px_1fr_1fr] items-center w-full">
          <Link to="/" className="mr-6 hidden lg:flex">
            <Logo className="h-6 w-6" />
            <span className="sr-only">Double decent</span>
          </Link>
          <div className="relative w-full flex-1">
            <Input
              type="text"
              className="w-full"
              placeholder="Search for groceries, accessories and more..."
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Search className="absolute top-3 right-2" size={15} />
          </div>
          {user ? (
            <div className="text-right flex items-center gap-4 justify-end">
              <Link
                to="/faq"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              >
                <CircleHelp size={20} /> FAQ
              </Link>
              <Dialog open={dialOpen} onOpenChange={setDialOpen}>
                <DropdownMenu>
                  <DropdownMenuTrigger className="border-none outline-none">
                    <Button
                      className="capitalize border-none"
                      variant="secondary"
                    >
                      <User />
                      {user.name}&#39;s Account
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-52">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => navigate("/user/profile")}
                    >
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/user/orders")}>
                      Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/user/address")}>
                      Delivery address
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-red-100 bg-red-50">
                      <DialogTrigger asChild className="w-full">
                        <span className="flex cursor-pointer items-center">
                          <LogOut color="red" />
                          <span className="text-red-700 hover:text-red-600 ml-2">
                            Logout
                          </span>
                        </span>
                      </DialogTrigger>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure you want to Logout?</DialogTitle>
                    <DialogDescription>
                      This will clear your session, you will be logged out and
                      redirected to the login page.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex justify-end gap-4 mt-4">
                    <Button
                      type="submit"
                      variant="destructive"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div
                className="relative cursor-pointer"
                onClick={handleCartNavigate}
              >
                <ShoppingCart color="orange" />{" "}
                <sup className="absolute -top-1 -right-1 text-white font-semibold bg-orange-500 border p-1 py-2 rounded-full">
                  {cartCount}
                </sup>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center flex-1">
              <Link
                to="/faq"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              >
                <CircleHelp size={20} /> FAQ
              </Link>

              <Link
                to="/login"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              >
                Sign up
              </Link>
              <div
                className="relative cursor-pointer"
                onClick={handleCartNavigate}
              >
                <ShoppingCart color="orange" />{" "}
                <sup className="absolute -top-1 -right-1 text-white font-semibold bg-orange-500 border p-1 py-2 rounded-full">
                  {cartCount}
                </sup>
              </div>
            </div>
          )}
        </nav>
      </header>
      <Outlet />
      <Footer />
    </>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

export default MainLayout;
