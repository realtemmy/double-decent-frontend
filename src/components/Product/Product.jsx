import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cart/cartSlice";
import { commaSeparatedPrice } from "@/utils/helperFunctions";
import { toast } from "sonner";

import PropTypes from "prop-types";
const Product = ({ product }) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`);
  }
  return (
    <div className="group relative w-40">
      <Link to={`/product/${product._id}`}>
        <img
          alt={product.name}
          src={product.image}
          className="aspect-square w-full rounded-md cursor-pointer bg-gray-200 object-cover"
          loading="lazy"
        />
      </Link>

      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <div className="capitalize">{product.name}</div>
          </h3>
          <p className="text-sm font-medium text-gray-900">
            {commaSeparatedPrice(product.price)}
          </p>
        </div>
        <p className="text-sm font-medium text-gray-900 cursor-pointer">
          <ShoppingCart color="orange" onClick={handleAddToCart} />
        </p>
      </div>
    </div>
  );
};
Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Product;
