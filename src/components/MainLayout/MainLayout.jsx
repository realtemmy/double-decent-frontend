import { useState } from "react";
import {
  ChevronRight,
  CircleHelp,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

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

import Footer from "../Footer/Footer";
import useUser from "@/hooks/use-user";
import axiosService from "@/axios";

import Spinner from "../Spinner/Spinner";

function MainLayout() {
  const navigate = useNavigate("");
  const [open, setOpen] = useState(false);
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

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error || secError) {
    return <div>There was an error fetching data</div>;
  }
  return (
    <>
      {isLoading && <Spinner />}
      <header className="flex justify-between h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <div className="flex gap-4 lg:hidden">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="border-none outline-none">
                  <Button
                    className="capitalize border-none"
                    variant="secondary"
                  >
                    <User />
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    User
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/login"
                className="text-slate-700 font-semibold hover:text-slate-600 hover:underline"
              >
                Login
              </Link>
            )}

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
                    <Link className="flex justify-between items-center me-4 hover:text-slate-700 text-slate-900 my-2 px-1">
                      <span>User profile</span>
                      <ChevronRight size={20} />
                    </Link>
                    <Link className="flex justify-between items-center me-4 hover:text-slate-700 text-slate-900 my-2 px-1">
                      <span>Order history</span>
                      <ChevronRight size={20} />
                    </Link>
                    <Link className="flex justify-between items-center me-4 hover:text-slate-700 text-slate-900 my-2 px-1">
                      <span>Security Settings</span>
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

        <nav className="hidden lg:grid grid-cols-[150px_1fr_1fr] w-full">
          <Link to="/" className="mr-6 hidden lg:flex">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
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
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => navigate("/user")}
                  >
                    User
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
