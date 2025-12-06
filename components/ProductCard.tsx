import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Check } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
      <Link to={`/product/${product.id}`} className="relative bg-gray-50 p-6 flex items-center justify-center h-56 group">
        <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-200" 
        />
      </Link>
      
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product/${product.id}`} className="text-sm font-medium hover:text-[#c7511f] line-clamp-2 mb-1">
          {product.title}
        </Link>
        
        {/* Rating */}
        <div className="flex items-center mb-1">
          <div className="flex text-[#febd69]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="text-xs text-blue-600 ml-1 hover:underline cursor-pointer">{product.reviewCount}</span>
        </div>

        {/* Price */}
        <div className="mt-1">
            <span className="text-xs align-top font-medium">₹</span>
            <span className="text-xl font-medium">{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
                <span className="text-xs text-gray-500 line-through ml-2">M.R.P: ₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
        </div>

        {/* Prime Badge / Delivery */}
        {product.isPrime && (
             <div className="flex items-center gap-1 mt-1">
                 <span className="text-xs text-[#00a8e1] font-bold flex items-center">
                    <Check className="w-3 h-3"/> Prime
                 </span>
                 <span className="text-xs text-gray-500">Get it by Tomorrow</span>
             </div>
        )}

        <div className="mt-auto pt-4">
            <button 
                onClick={handleAddToCart}
                className="w-full bg-black hover:bg-gray-800 border border-black rounded-full py-1.5 text-xs font-medium text-[#D4AF37] shadow-sm active:ring-2 active:ring-[#D4AF37]/50"
            >
                Add to Cart
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;