import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosService from "@/axios";

const ProductPage = () => {
  const { productId } = useParams();
  const {data: product, isLoading, error} = useQuery({
    queryKey: ["product", productId],
    queryFn: async() => {
      const response = await axiosService.get(`/products/${productId}`);
      return response.data;
    }
  })
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="bg-gray-200 animate-pulse h-40 w-full" />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2">
      <img src={product.image} alt={product.name} loading="lazy" />
      <section>
        <div>
          <h4>{product.name}</h4>
          <div>
            <span>Category: {product.category}</span>
            <span>Brand: {product.brand}</span>
          </div>
        </div>
        <div>
          Price: {product.price}
        </div>
        <div>
          {
            product.description
          }
        </div>
        
      </section>
    </div>
  );
};

export default ProductPage;
