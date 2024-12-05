import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import axiosService from "@/axios";

// import Pagination from "@/components/Pagination/Pagination";

import Product from "@/components/Product/Product";

const Products = () => {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosService.get("/products");
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>There was an error fetching products: {error.message}</div>;
  }
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
          Products catalogue
        </h2>
        <div className="flex gap-4">
          {products.map((product, index) => (
            <Product product={product} key={index} />
          ))}
        </div>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Products;
