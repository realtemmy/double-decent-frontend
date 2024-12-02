import { useState } from "react";
import { CircleHelp, Search } from "lucide-react";
import { Outlet, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import axiosService from "@/axios";

function MainLayout() {
  const [categoryId, setCategoryId] = useState("");
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
  if (isLoading || secLoading) {
    return <div>Loading...</div>;
  }
  if (error || secError) {
    return <div>There was an error fetching data</div>;
  }
  return (
    <>
      <header className="flex justify-between h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link to="/" className="mr-6 hidden lg:flex">
              <MountainIcon className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <div className="grid gap-2 py-6 w-full">
              <Accordion type="single" collapsible onValueChange={handleChange}>
                {categories.map((category, index) => (
                  <AccordionItem value={category.id} key={index}>
                    <AccordionTrigger className="capitalize">
                      {category.name}
                    </AccordionTrigger>
                    <AccordionContent>
                      {sections.map((section, index) => (
                        <Link key={index}>{section.name}</Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </SheetContent>
        </Sheet>
        <Link to="/" className="mr-6 hidden lg:flex">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="hidden lg:flex items-center w-full">
          <div className="relative w-full flex-1">
            <Input type="search" className="w-full" />
            <Search className="absolute top-3 right-2" size={15} />
          </div>
          <div className="flex items-center justify-center flex-1">
            <Link
              to="/help"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            >
              <CircleHelp size={20} /> Help
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
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default MainLayout;

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
