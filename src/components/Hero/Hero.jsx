import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import axiosService from "@/axios";


const Hero = () => {
  let navigate = useNavigate();
  const {
    isLoading,
    error,
    data: categories = [],
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
    return <div>There was an error fetching data</div>;
  }
  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto grid max-w-screen-xl px-4 pb-8 md:grid-cols-12 lg:gap-12 lg:pb-16 xl:gap-0">
        <div className="content-center justify-self-start md:col-span-7 md:text-start">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight dark:text-white md:max-w-2xl md:text-5xl xl:text-6xl">
            Limited Time Offer!
            <br />
            Up to 50% OFF for delivery!
          </h1>
          <p className="max-w-2xl text-gray-500 dark:text-gray-400 md:mb-12 md:text-lg mb-3 lg:mb-5 lg:text-xl">
            Don&apos;t Wait - Limited Stock at Unbeatable Prices!
          </p>
          <Button
            onClick={() => navigate("/products")}
            className="bg-orange-500 text-white hover:bg-orange-600"
          >
            Shop Now
          </Button>
        </div>
        <div className="hidden md:col-span-5 md:mt-0 md:flex">
          <img
            className="dark:hidden"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list.svg"
            alt="shopping illustration"
            title="Hero image light"
          />
          <img
            className="hidden dark:block"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list-dark.svg"
            alt="shopping illustration"
            title="Hero image dark"
          />
        </div>
      </div>
      <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-8 text-gray-500 dark:text-gray-400 sm:grid-cols-3 sm:gap-12 lg:grid-cols-6 px-4">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/category/${category.slug}`}
            className="flex items-center md:justify-center h-10 hover:text-gray-900 dark:hover:text-white capitalize font-semibold text-xl"
            title={`Explore the ${category.name} category`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Hero;
