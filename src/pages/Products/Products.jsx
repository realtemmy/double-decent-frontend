import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import PaginationButton from "@/components/Pagination/Pagination";

import axiosService from "@/axios";

// import Pagination from "@/components/Pagination/Pagination";

import Product from "@/components/Product/Product";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: async () =>
      await axiosService.get(`/products?page=${currentPage}`),
  });

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>There was an error fetching products: {error.message}</div>;
  }

  console.log(data);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
          Products catalogue
        </h2>
        <div className="flex gap-4">
          {data.data.map((product, index) => (
            <Product product={product} key={index} />
          ))}
        </div>
      </div>
      <PaginationButton data={data} onPageChange={handlePageChange} />
    </div>
  );
};

export default Products;
