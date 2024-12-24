import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { slugTitleToString, capitalizeFirstLetter } from "@/utils/helperFunctions";

import axiosService from "@/axios";
import PaginationButton from "@/components/Pagination/Pagination";
import Product from "@/components/Product/Product";
import Spinner from "@/components/Spinner/Spinner";

const Category = () => {
  const { categoryName } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useQuery({
    queryKey: ["category", categoryName, currentPage],
    queryFn: async () =>
      // await axiosService.get(`/category/${categoryId}/product?page=${currentPage}`),
      await axiosService.get(
        `/products/category/${categoryName}?page=${currentPage}`
      ),
  });

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };

  if (error) {
    return (
      <div>
        There was an error fetching products in category: {error.message}
      </div>
    );
  }
  return (
    <div className="bg-white">
      <Helmet>
        <title>
          {capitalizeFirstLetter(categoryName.replace("-", " "))} - Category
        </title>
        <meta
          name="description"
          content={`${capitalizeFirstLetter(
            categoryName.replace("-", " ")
          )} category page for Double Decent Superstore`}
        />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      {isLoading && <Spinner />}
      <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-700 text-center mb-4 capitalize">
          {slugTitleToString(categoryName)}
        </h1>
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(120px,1fr))]">
          {data?.data.length === 0 ? (
            <div className="text-center w-full">
              No products found in this category
            </div>
          ) : (
            data?.data.map((product, index) => (
              <Product product={product} key={index} />
            ))
          )}
        </div>
      </div>
      <PaginationButton data={data} onPageChange={handlePageChange} />
    </div>
  );
};

export default Category;
