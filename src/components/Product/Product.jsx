import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { commaSeparatedPrice } from '@/utils/helperFunctions';
import PropTypes from 'prop-types';

const Product = ({product}) => {
  return (
    <div className="group relative">
        <Link to={`/product/${product._id}`}> <img
        alt={product.name}
        src={product.image}
        className="aspect-square w-full rounded-md cursor-pointer bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
        loading="lazy"
      />
        </Link>
     
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <div className='capitalize'>{product.name}</div>
          </h3>
          <p className="text-sm font-medium text-gray-900">{commaSeparatedPrice(product.price)}</p>
        </div>
        <p className="text-sm font-medium text-gray-900 cursor-pointer">
          <ShoppingCart color="orange" />
        </p>
      </div>
    </div>
  );
}
Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Product;
