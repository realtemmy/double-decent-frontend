import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosService from "@/axios";
import { slugTitleToString } from "@/utils/helperFunctions";
import Product from "@/components/Product/Product";
import PaginationButton from "@/components/Pagination/Pagination";

const Section = () => {
  const { sectionName } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useQuery({
    queryKey: ["sections", sectionName, currentPage],
    queryFn: async () =>
      await axiosService.get(`/products/section/${sectionName}`),
  });

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        There was an error fetching products in sections: {error.message}
      </div>
    );
  }
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-700 text-center mb-4 capitalize">
          {slugTitleToString(sectionName)}
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

export default Section;
