import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Spinner from "../Spinner/Spinner";
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

  if (error) {
    return <div>Error loading categories: {error.message}</div>;
  }
  return (
    <div>
      <div className="mx-auto max-w-7xl">
        {isLoading && <Spinner />}
        <div className="mx-auto">
          <h1 className="text-xl font-semibold my-2 text-gray-900">
            Shop from our collections -
          </h1>

          <ScrollArea className="w-full whitespace-nowrap rounded-md px-4 sm:px-6 lg:px-8 bg-gray-100">
            <div className="flex justify-between gap-1 flex-wrap max-w-2xl py-10 sm:py-16 lg:max-w-none lg:py-20">
              {categories.map((category, index) => (
                <div key={index} className="group relative">
                  <img
                    alt={category.name}
                    src={category.image}
                    className="w-24 h-auto rounded-lg bg-white object-cover"
                    title={`Category - ${category.name}`}
                  />
                  <h2 className="mt-6 text-sm text-gray-500 text-center">
                    <Link
                      to={`/category/${category.slug}`}
                      className="hover:text-gray-700 capitalize relative block"
                      title={`Explore the ${category.name} category`}
                    >
                      {category.name}
                    </Link>
                  </h2>
                </div>
              ))}
            </div>

            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
      <div>
        {categories.map((category, index) => (
          <ProductList
            categoryId={category._id}
            key={index}
            slug={`/category/${category.slug}`}
            title={category.name}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
