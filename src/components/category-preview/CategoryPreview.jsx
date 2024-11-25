import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import axiosService from "@/axios";

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
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className="flex justify-between flex-wrap">
              {categories.map((category) => (
                <div key={category.id} className="group relative">
                  <img
                    alt={category.name}
                    src={category.image}
                    className="w-24 h-auto rounded-lg bg-white object-cover group-hover:opacity-75 sm:aspect-[2/1] lg:aspect-square"
                  />
                  <h3 className="mt-6 text-sm text-gray-500">
                    <Link to={`/${category.slug}`}>
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
    </div>
  );
};

export default CategoryPreview;
