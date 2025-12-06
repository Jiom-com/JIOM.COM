import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Lock, ChevronRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { useStore } from '../context/StoreContext';
import AIProductAssistant from '../components/AIProductAssistant';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, user } = useStore();
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (product) setActiveImage(product.image);
    else navigate('/');
  }, [product, navigate]);

  const getDeliveryDate = (daysToAdd: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' });
  };

  if (!product) return null;

  const deliveryDate = getDeliveryDate(product.isPrime ? 1 : 4);

  return (
    <div className="bg-white min-h-screen py-4">
      <div className="container mx-auto px-4">
        
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-4 flex items-center">
             <span className="hover:underline cursor-pointer">Home</span> <ChevronRight className="w-3 h-3 mx-1"/>
             <span className="hover:underline cursor-pointer">{product.category}</span> <ChevronRight className="w-3 h-3 mx-1"/>
             <span className="text-gray-700 truncate max-w-xs">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Images */}
          <div className="md:col-span-5 flex gap-4">
            <div className="flex flex-col gap-2">
                {[product.image, `https://picsum.photos/400/400?random=${product.id}1`, `https://picsum.photos/400/400?random=${product.id}2`].map((img, idx) => (
                    <button 
                        key={idx} 
                        className={`w-12 h-12 border rounded hover:shadow-md p-1 ${activeImage === img ? 'ring-2 ring-[#e77600] shadow-md' : 'border-gray-300'}`}
                        onMouseEnter={() => setActiveImage(img)}
                    >
                        <img src={img} className="w-full h-full object-contain" alt="" />
                    </button>
                ))}
            </div>
            <div className="flex-1 flex justify-center items-start">
                <img src={activeImage} alt={product.title} className="max-w-full max-h-[500px] object-contain" />
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-4">
            <h1 className="text-2xl font-medium text-gray-900 mb-2">{product.title}</h1>
            
            <div className="flex items-center gap-2 mb-2 border-b border-gray-200 pb-2">
              <div className="flex text-[#febd69]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-sm text-blue-600 hover:underline cursor-pointer">{product.reviewCount} ratings</span>
            </div>

            <div className="mb-4">
                <div className="flex items-start gap-1">
                    <span className="text-sm mt-1">₹</span>
                    <span className="text-3xl font-medium">{product.price.toLocaleString('en-IN')}</span>
                </div>
                {product.originalPrice && (
                    <div className="text-sm text-gray-500">
                        M.R.P.: <span className="line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                        <span className="ml-2 text-[#cc0c39] font-medium">({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off)</span>
                    </div>
                )}
                <div className="text-sm text-gray-600 mt-1">Inclusive of all taxes</div>
            </div>

            {/* AI Assistant Integration */}
            <AIProductAssistant product={product} />

            <div className="mt-6 space-y-2 text-sm text-gray-700">
                <div className="flex gap-2">
                   <span className="font-bold w-24">Brand</span>
                   <span>Generic</span>
                </div>
                <div className="flex gap-2">
                   <span className="font-bold w-24">Category</span>
                   <span>{product.category}</span>
                </div>
            </div>

            <div className="mt-4">
                <h3 className="font-bold mb-2">About this item</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                    <li>{product.description}</li>
                    <li>High performance and durable build quality.</li>
                    <li>Designed for daily usage with premium finish.</li>
                </ul>
            </div>
          </div>

          {/* Buy Box */}
          <div className="md:col-span-3">
             <div className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white">
                <div className="text-xl font-medium mb-2">₹{product.price.toLocaleString('en-IN')}</div>
                
                <div className="text-sm text-[#007600] font-medium mb-4">In Stock</div>
                
                <div className="text-sm text-gray-600 mb-4">
                    <span className="text-[#00a8e1] hover:underline cursor-pointer">FREE delivery</span> <b>{deliveryDate}</b>. Order within <span className="text-green-600">5 hrs 30 mins</span>.
                    <div className="flex items-center gap-1 mt-1 text-xs text-[#007185] hover:text-[#c7511f] cursor-pointer">
                        <MapPin className="w-3 h-3" /> Deliver to {user ? user.name.split(' ')[0] : 'Guest'} - New Delhi 110001
                    </div>
                </div>

                <div className="space-y-2">
                    <button 
                        onClick={() => addToCart(product)}
                        className="w-full bg-black hover:bg-gray-800 rounded-full py-2 text-sm font-medium shadow-sm text-[#D4AF37]"
                    >
                        Add to Cart
                    </button>
                    <button 
                        onClick={() => { addToCart(product); navigate('/checkout'); }}
                        className="w-full bg-gray-900 hover:bg-gray-800 rounded-full py-2 text-sm font-medium shadow-sm text-[#D4AF37] border border-black"
                    >
                        Buy Now
                    </button>
                </div>

                <div className="mt-4 text-xs text-gray-600 space-y-1">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Ships from</span>
                        <span>JIOM</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Sold by</span>
                        <span className="text-blue-600">Appario Retail</span>
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-1 text-xs text-blue-600">
                    <Lock className="w-3 h-3 text-gray-500" /> Secure transaction
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;