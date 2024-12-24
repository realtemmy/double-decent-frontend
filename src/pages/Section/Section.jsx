import { useState, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosService from "@/axios";
import {
  capitalizeFirstLetter,
  slugTitleToString,
} from "@/utils/helperFunctions";

import Product from "@/components/Product/Product";
import PaginationButton from "@/components/Pagination/Pagination";
import Spinner from "@/components/Spinner/Spinner";

const Section = () => {
  const { sectionName } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useQuery({
    queryKey: ["sections", sectionName, currentPage],
    queryFn: async () =>
      await axiosService.get(
        `/products/section/${sectionName}?limit=20&page=${currentPage}`
      ),
  });

  const handlePageChange = useCallback((currentPage) => {
    setCurrentPage(currentPage);
  }, []);

  if (error) {
    return (
      <div>
        There was an error fetching products in sections: {error.message}
      </div>
    );
  }
  return (
    <div className="bg-white">
      <Helmet>
        <title>{capitalizeFirstLetter(sectionName.replace("-", " "))} - Section</title>
        <meta
          name="description"
          content={`${capitalizeFirstLetter(
            sectionName.replace("-", " ")
          )} section page for Double Decent Superstore`}
        />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      {isLoading && <Spinner />}
      <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-700 text-center mb-8 capitalize">
          {slugTitleToString(sectionName)}
        </h1>
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(120px,1fr))]">
          {data?.data.length === 0 ? (
            <div className="text-center w-full">
              No products found in this section
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

export default Section;
