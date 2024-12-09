import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { slugTitleToString } from "@/utils/helperFunctions";

import axiosService from "@/axios";
import PaginationButton from "@/components/Pagination/Pagination";
import Product from "@/components/Product/Product";

const Category = () => {
  const { categoryName } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useQuery({
    queryKey: ["category", categoryName, currentPage],
    queryFn: async () =>
      // await axiosService.get(`/category/${categoryId}/product?page=${currentPage}`),
    await axiosService.get(`/products/category/${categoryName}?page=${currentPage}`),
  });

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        There was an error fetching products in category: {error.message}
      </div>
    );
  }
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-700 text-center mb-4 capitalize">
          {slugTitleToString(categoryName)}
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

export default Category;
