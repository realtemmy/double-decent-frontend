import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import axiosService from "@/axios";
const Hero = () => {
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
          // className="inline-block rounded-lg bg-primary-700 px-6 py-3.5 text-center font-medium hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Shop Now
          </Button>
        </div>
        <div className="hidden md:col-span-5 md:mt-0 md:flex">
          <img
            className="dark:hidden"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list.svg"
            alt="shopping illustration"
          />
          <img
            className="hidden dark:block"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list-dark.svg"
            alt="shopping illustration"
          />
        </div>
      </div>
      <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-8 text-gray-500 dark:text-gray-400 sm:grid-cols-3 sm:gap-12 lg:grid-cols-6 px-4">
        {categories.map((category, index) => (
          <Link
            key={index}
            to="/"
            className="flex items-center md:justify-center h-10 hover:text-gray-900 dark:hover:text-white capitalize font-semibold text-xl"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Hero;
