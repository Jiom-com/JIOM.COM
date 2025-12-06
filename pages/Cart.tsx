import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { CheckCircle } from 'lucide-react';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useStore();
  const navigate = useNavigate();

  const getDeliveryDate = (isPrime: boolean | undefined) => {
    const days = isPrime ? 1 : 4;
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  if (cart.length === 0) {
    return (
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="container mx-auto bg-white p-8 rounded shadow-sm text-center">
            <h1 className="text-2xl font-bold mb-4">Your Amazon Cart is empty.</h1>
            <p className="mb-6">Check your Saved for later items below or continue shopping.</p>
            <Link to="/" className="bg-black text-[#D4AF37] px-6 py-2 rounded-md font-medium text-sm hover:bg-gray-900">
                Continue Shopping
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-6">
        
        {/* Cart Items List */}
        <div className="flex-1 bg-white p-6 rounded shadow-sm">
            <h1 className="text-2xl font-medium border-b border-gray-200 pb-4 mb-4">Shopping Cart</h1>
            <div className="flex justify-end mb-2">
                <span className="text-sm text-gray-500">Price</span>
            </div>
            
            <div className="space-y-6">
                {cart.map(item => (
                    <div key={item.id} className="flex gap-4 border-b border-gray-200 pb-6 last:border-0">
                        <Link to={`/product/${item.id}`}>
                            <img src={item.image} alt={item.title} className="w-32 h-32 object-contain" />
                        </Link>
                        <div className="flex-1">
                            <Link to={`/product/${item.id}`} className="font-medium hover:text-[#c7511f] line-clamp-2 text-lg">
                                {item.title}
                            </Link>
                            <div className="text-xs text-[#007600] my-1">In Stock</div>
                            <div className="text-xs text-gray-500 mb-1">
                                <span className="text-[#565959]">FREE delivery</span> <strong>{getDeliveryDate(item.isPrime)}</strong>
                            </div>
                            {item.isPrime && <div className="text-xs font-bold text-[#00a8e1] flex items-center gap-1"><img src="https://via.placeholder.com/40x15?text=Prime" alt="Prime" className="h-4"/></div>}
                            
                            <div className="flex items-center gap-4 mt-2">
                                <select 
                                    value={item.quantity} 
                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                    className="bg-[#f0f2f2] border border-gray-300 rounded px-2 py-1 text-sm shadow-sm hover:bg-[#e3e6e6]"
                                >
                                    {[...Array(10)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>Qty: {i + 1}</option>
                                    ))}
                                </select>
                                <div className="h-4 w-px bg-gray-300"></div>
                                <button onClick={() => removeFromCart(item.id)} className="text-xs text-blue-600 hover:underline">Delete</button>
                                <div className="h-4 w-px bg-gray-300"></div>
                                <button className="text-xs text-blue-600 hover:underline">Save for later</button>
                            </div>
                        </div>
                        <div className="font-bold text-lg">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end pt-4">
                <div className="text-lg">
                    Subtotal ({cartCount} items): <span className="font-bold">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
            </div>
        </div>

        {/* Checkout Sidebar */}
        <div className="w-full lg:w-80 h-fit">
            <div className="bg-white p-6 rounded shadow-sm">
                <div className="flex items-start gap-2 mb-4 text-[#067d62]">
                    <CheckCircle className="w-5 h-5 mt-0.5" />
                    <span className="text-sm">Your order is eligible for FREE Delivery. Select this option at checkout.</span>
                </div>
                <div className="text-lg mb-4">
                    Subtotal ({cartCount} items): <span className="font-bold">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                
                <label className="flex items-center gap-2 mb-4 text-sm">
                    <input type="checkbox" /> This order contains a gift
                </label>

                <button 
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-black hover:bg-gray-900 rounded-lg py-2 text-sm font-medium shadow-sm mb-4 text-[#D4AF37]"
                >
                    Proceed to Buy
                </button>
            </div>
            
            {/* Recommendations mock */}
            <div className="bg-white p-4 rounded shadow-sm mt-4">
                <h3 className="font-bold text-sm mb-2">Customers who bought items in your cart also bought</h3>
                <div className="flex gap-2">
                    <img src="https://picsum.photos/100/100?random=99" className="w-16 h-16 object-cover" />
                    <div>
                        <div className="text-xs text-blue-600 line-clamp-2">USB C Cable 3ft Fast Charging</div>
                        <div className="text-xs text-[#b12704] font-bold">₹299</div>
                        <button className="text-xs bg-black text-[#D4AF37] px-2 py-0.5 rounded-full mt-1">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;