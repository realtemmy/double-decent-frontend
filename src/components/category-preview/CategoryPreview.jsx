import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import axiosService from "@/axios";

import ProductList from "../product-list/ProductList";

const CategoryPreview = () => {
  const {
    isLoading,
    error,
    data: categories,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await axiosService.get("/category");
      return response.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading categories: {error.message}</div>;
  }
  return (
    <div>
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto">
          <h2 className="text-xl font-semibold my-2 text-gray-900">
            Shop from our collections -
          </h2>

          <ScrollArea className="w-full whitespace-nowrap rounded-md px-4 sm:px-6 lg:px-8 bg-gray-100">
            <div className="flex justify-between flex-wrap max-w-2xl py-10 sm:py-16 lg:max-w-none lg:py-20">
              {categories.map((category, index) => (
                <div key={index} className="group relative">
                  <img
                    alt={category.name}
                    src={category.image}
                    className="w-24 h-auto rounded-lg bg-white object-cover "
                  />
                  <h3 className="mt-6 text-sm text-gray-500 text-center">
                    <Link
                      to={`/category/${category.slug}`}
                      className="hover:text-gray-700"
                    >
                      <span className="absolute inset-0" />
                      {category.name}
                    </Link>
                  </h3>
                </div>
              ))}
            </div>

            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
      <div >
        {categories.map((category, index) => (
          <ProductList
            categoryId={category._id}
            key={index}
            slug={`/category/${category._id}`}
            title={category.name}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
