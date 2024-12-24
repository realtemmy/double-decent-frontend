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
    <div className="group relative w-full max-w-[200px] overflow-hidden">
      <Link to={`/product/${product._id}`}>
        <img
          alt={product.name}
          src={product.image || "/path/to/fallback-image.jpg"}
          className="aspect-square w-full rounded-md cursor-pointer bg-gray-200 object-cover"
          loading="lazy"
          title={`Product -${product.name}`}
        />
      </Link>

      <div className="mt-4 flex justify-between items-start">
        <div className="max-w-[150px] overflow-hidden">
          <h3 className="text-sm text-gray-700">
            <span className="block truncate text-ellipsis whitespace-nowrap capitalize">
              {product.name}
            </span>
          </h3>
          <p className="text-sm font-medium text-gray-900">
            {commaSeparatedPrice(product.price)}
          </p>
        </div>
        <button
          className="flex-shrink-0 text-sm font-medium text-gray-900 cursor-pointer"
          onClick={handleAddToCart}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart color="orange" />
        </button>
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
