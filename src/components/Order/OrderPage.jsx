import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosService from "@/axios";

const OrderPage = () => {
  const { orderId } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const response = await axiosService.get(`/order/${orderId}`);
      return response.data;
    },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>There was an error fetching data: {error.message}</div>;
  }
  return <div></div>;
};

export default OrderPage;
