import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { commaSeparatedPrice } from "@/utils/helperFunctions";
import ProductList from "../product-list/ProductList";

import { Button } from "../ui/button";

import axiosService from "@/axios";

const ProductPage = () => {
  const { productId } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await axiosService.get(`/products/${productId}`);
      return response.data;
    },
  });
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
    return <div>There was an error fetching product: {error.message}</div>;
  }

  return (
    <>
      <div className="grid grid-cols-2 p-2 gap-4 mb-10">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="aspect-square w-full rounded-md cursor-pointer bg-gray-200 object-cover object-center group-hover:opacity-75 lg:aspect-auto lg:h-96"
        />
        <section>
          <div className="my-4">
            <h4 className="text-3xl capitalize">{product.name}</h4>
            <div className="text-xs">
              <span>Category: {product.category.name}</span>
              <span>Brand: {product.brand}</span>
            </div>
          </div>
          <div className="font-semibold text-3xl my-4">
            &#8358;
            {commaSeparatedPrice(product.price)}
          </div>
          <div className="mt-2">{product.description}</div>
          <div className="flex gap-4 my-4">
            <div>
              <Button
                className="rounded-tr-none rounded-br-none border-black"
                variant="outline"
              >
                -
              </Button>
              <Button
                className="rounded-none border border-black"
                variant="outline"
              >
                0
              </Button>
              <Button
                className="rounded-tl-none rounded-bl-none border border-black"
                variant="outline"
              >
                +
              </Button>
            </div>
            <Button>Add to cart</Button>
          </div>
          <p className="">*Delivery only within lagos</p>
        </section>
      </div>
      <ProductList
        title={"Similar products"}
        categoryId={product.category._id}
        slug={product.category.name}
      />
    </>
  );
};

export default ProductPage;
