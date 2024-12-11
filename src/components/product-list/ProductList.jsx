import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

import axiosService from "@/axios";

import Product from "../Product/Product";

const ProductList = ({ title, slug, categoryId }) => {
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: categoryId ? ["category products", categoryId] : ["products"],
    queryFn: async () => {
      const endpoint = categoryId
        ? `/category/${categoryId}/product?limit=5`
        : "/products?limit=5";
      const response = await axiosService.get(endpoint);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="bg-gray-200 animate-pulse h-40 w-full" />
        ))}
      </div>
    );
  }
  if (error) {
    return <div>There was an error fetching products: {error.message}</div>;
  }
  return (
    <div>
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold tracking-tight capitalize text-gray-900 mx-2">
          {title && categoryId ? title: "Other products"}
        </h2>
        {slug && (
          <Link
            className="text-orange-500 font-semibold underline hover:text-orange-400"
            to={slug}
          >
            see more
          </Link>
        )}
      </div>

      {/* Horizontal scrolling container */}
      <ScrollArea className="bg-white w-full p-4">
        <div className="flex justify- gap-2">
          {products.map((product) => (
            <div key={product._id}  className="w-32">
              <Product product={product} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default ProductList;
