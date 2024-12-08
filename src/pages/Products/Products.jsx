import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Checkbox } from "@/components/ui/checkbox";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Loader } from "lucide-react";
import PaginationButton from "@/components/Pagination/Pagination";

import axiosService from "@/axios";

// import Pagination from "@/components/Pagination/Pagination";

import Product from "@/components/Product/Product";
import { Label } from "@/components/ui/label";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [openAccordion, setOpenAccordion] = useState("category");

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", currentPage, categories],
    queryFn: async () =>
      await axiosService.get(`/products?page=${currentPage}`),
  });

  const {
    data: cats = [],
    isLoading: catLoading,
    error: catError,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await axiosService.get("/category");
      return response.data;
    },
  });

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const handleCategoryChange = (checked, categoryId) => {
    setCategories((prevCategories) => {
      const updatedCategories = checked
        ? [...prevCategories, categoryId]
        : prevCategories.filter((id) => id !== categoryId);
      return updatedCategories; // Return the new state
    });
  };
  

  if (isLoading || catLoading) {
    return <div><Loader /> Loading...</div>;
  }
  if (error || catError) {
    return (
      <div>
        There was an error fetching data: {error?.message || catError?.message}
      </div>
    );
  }

  // console.log(cats);

  return (
    <div className="bg-white grid grid-cols-1 md:grid-cols-[300px_1fr] items-start">
      <Card className="h-fit w-full mx-2">
        {/* <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader> */}
        <CardContent className="px-3">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={openAccordion}
            onValueChange={(value) => setOpenAccordion(value)}
          >
            <AccordionItem value="category">
              <AccordionTrigger className="bg-white hover:no-underline">
                Category
              </AccordionTrigger>
              <AccordionContent>
                {catLoading ? (
                  <p>Loading categories...</p>
                ) : (
                  cats.map((cat, index) => (
                    <div
                      className="flex items-center space-x-2 my-1"
                      key={index}
                    >
                      <Checkbox
                        id={cat.id}
                        checked={categories.includes(cat.id)}
                        onCheckedChange={(checked) =>
                          handleCategoryChange(checked, cat.id)
                        }
                      />
                      <Label
                        htmlFor={cat.id}
                        className="capitalize text-gray-700"
                      >
                        {cat.name}
                      </Label>
                    </div>
                  ))
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <p>Lets talk</p>
        </CardContent>
      </Card>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8 border">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
          Products catalogue
        </h2>
        <div className="flex gap-4">
          {data.data?.map((product, index) => (
            <Product product={product} key={index} />
          ))}
        </div>
      </div>
      <PaginationButton data={data} onPageChange={handlePageChange} />
    </div>
  );
};

export default Products;
