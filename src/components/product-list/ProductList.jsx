import { useQuery } from "@tanstack/react-query";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import axiosService from "@/axios";

import Product from "../Product/Product";

const ProductList = () => {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axiosService.get("/products");
      return response.data;
    },
  });

  console.log(products);

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
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 mx-2">
        Products Catalogue
      </h2>
      {/* Horizontal scrolling container */}
      <ScrollArea className="bg-white w-full p-4">
        <div className="mt- flex space-x-4 overflow-x-auto">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex-shrink-0 w-[250px] md:w-[300px]"
            >
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
