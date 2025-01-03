import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

import {
  Sheet,
  SheetContent,
  SheetDescription,
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

import Spinner from "@/components/Spinner/Spinner";
import PaginationButton from "@/components/Pagination/Pagination";

import axiosService from "@/axios";

// import Pagination from "@/components/Pagination/Pagination";

import Product from "@/components/Product/Product";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";

const Products = () => {
  const currentUrl = window.location.href;
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [openAccordion, setOpenAccordion] = useState("category");
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const handleOpen = useCallback(() => setOpen(!open), [open]);

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", currentPage, categories, search],
    queryFn: async () =>
      await axiosService.get(
        `/products?page=${currentPage}&category=${categories.join(
          ","
        )}&limit=20&search=${search}`
      ),
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

  const handlePageChange = useCallback((currentPage) => {
    setCurrentPage(currentPage);
  }, []);

  const handleCategoryChange = (checked, categoryId) => {
    setCategories((prevCategories) => {
      const updatedCategories = checked
        ? [...prevCategories, categoryId]
        : prevCategories.filter((id) => id !== categoryId);
      return updatedCategories; // Return the new state
    });
  };

  if (error || catError) {
    return (
      <div>
        There was an error fetching data: {error?.message || catError?.message}
      </div>
    );
  }

  return (
    <div className="bg-white grid grid-cols-1 md:grid-cols-[300px_1fr] gap- mx-2">
      <Helmet>
        <title>Products</title>
        <meta
          name="description"
          content="Products page for Double Decent superstore"
        />
        <link rel="canonical" href={currentUrl} />
      </Helmet>
      {(isLoading || catLoading) && <Spinner />}
      <div className="md:hidden w-full">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="my-1">
            <Button className="flex ">
              <span>Filter</span> <ListFilter />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
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
                            onClick={handleOpen}
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
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="bg-white hover:no-underline">
                      Price
                    </AccordionTrigger>
                    <AccordionContent>
                      <RadioGroup defaultValue="prices">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1000" id="r1" />
                          <Label htmlFor="r1">Less than &#8358;1,000</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="5000" id="r2" />
                          <Label htmlFor="r2">
                            {" "}
                            &#8358;1,000 to &#8358;5,000
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="20000" id="r3" />
                          <Label htmlFor="r3">
                            {" "}
                            &#8358;5,000 to &#8358;20,000
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="50000" id="r4" />
                          <Label htmlFor="r4">
                            {" "}
                            &#8358;20,000 to &#8358;50,000
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="100000" id="r5" />
                          <Label htmlFor="r5">
                            {" "}
                            &#8358;50,000 to &#8358;100,000
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="compact" id="r6" />
                          <Label htmlFor="r6">Over &#8358;100,000</Label>
                        </div>
                      </RadioGroup>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <Card className="h-fit mx-2">
        {/* <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader> */}
        <CardContent className="px-3 hidden md:block">
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
            <AccordionItem value="item-2">
              <AccordionTrigger className="bg-white hover:no-underline">
                Price
              </AccordionTrigger>
              <AccordionContent>
                <RadioGroup defaultValue="prices">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1000" id="r1" />
                    <Label htmlFor="r1">Less than &#8358;1,000</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5000" id="r2" />
                    <Label htmlFor="r2"> &#8358;1,000 to &#8358;5,000</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="20000" id="r3" />
                    <Label htmlFor="r3"> &#8358;5,000 to &#8358;20,000</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="50000" id="r4" />
                    <Label htmlFor="r4"> &#8358;20,000 to &#8358;50,000</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="100000" id="r5" />
                    <Label htmlFor="r5"> &#8358;50,000 to &#8358;100,000</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="compact" id="r6" />
                    <Label htmlFor="r6">Over &#8358;100,000</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800 mb-8">
          Products catalogue
        </h1>
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(120px,1fr))] m-auto px-2">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-gray-200 animate-pulse h-40 w-full"
                />
              ))}
            </div>
          ) : data.data?.length === 0 ? (
            <div className="flex items-center justify-center w-full h-96">
              No products available.
            </div>
          ) : (
            data.data?.map((product, index) => (
              <Product product={product} key={index} />
            ))
          )}
        </div>
      </div>
      <div className="my-4 col-span-2">
        <PaginationButton data={data} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default Products;
