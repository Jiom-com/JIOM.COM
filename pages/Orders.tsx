import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { OrderStatus, Product } from '../types';
import { Link, useNavigate } from 'react-router-dom';

const Orders: React.FC = () => {
  const { orders, cancelOrder, addToCart } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredOrders = orders.filter(order => 
    order.items.some(item => item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    order.id.includes(searchTerm)
  );

  const getStatusStep = (status: OrderStatus) => {
    switch(status) {
        case 'Processing': return 1;
        case 'Shipped': return 2;
        case 'Out for Delivery': return 3;
        case 'Delivered': return 4;
        case 'Cancelled': return -1;
        default: return 1;
    }
  };

  const renderStatus = (status: OrderStatus, estimatedDelivery: string) => {
    if (status === 'Delivered') {
        return (
            <div className="font-bold text-lg text-gray-900 mb-1">
                Delivered {new Date(estimatedDelivery).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
            </div>
        );
    } else if (status === 'Cancelled') {
        return <div className="font-bold text-lg text-red-600 mb-1">Cancelled</div>;
    } else {
        return (
            <div className="font-bold text-lg text-[#007600] mb-1">
                Arriving {new Date(estimatedDelivery).toLocaleDateString('en-IN', { weekday: 'long' })}
            </div>
        );
    }
  };

  const renderProgressBar = (status: OrderStatus) => {
    const currentStep = getStatusStep(status);
    if (currentStep === -1) return null;

    const steps = [
        { label: 'Ordered', icon: Clock },
        { label: 'Shipped', icon: Package },
        { label: 'Out for Delivery', icon: Truck },
        { label: 'Delivered', icon: CheckCircle },
    ];

    return (
        <div className="mt-4 mb-2">
            <div className="relative flex items-center justify-between w-full max-w-md">
                {/* Progress Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2 rounded"></div>
                <div 
                    className="absolute top-1/2 left-0 h-1 bg-green-600 -z-10 -translate-y-1/2 rounded transition-all duration-500"
                    style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                ></div>

                {steps.map((step, index) => {
                    const isActive = index + 1 <= currentStep;
                    const Icon = step.icon;
                    return (
                        <div key={step.label} className="flex flex-col items-center bg-white px-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border-2 ${isActive ? 'border-green-600 bg-green-600 text-white' : 'border-gray-300 text-gray-300'}`}>
                                <Icon className="w-3 h-3" />
                            </div>
                            <span className={`text-[10px] mt-1 ${isActive ? 'text-green-700 font-medium' : 'text-gray-400'}`}>{step.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
  };

  const handleCancelOrder = (orderId: string) => {
    if (window.confirm("Are you sure you want to cancel this order? This action cannot be undone.")) {
      cancelOrder(orderId);
    }
  };

  const handleBuyAgain = (product: Product) => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="bg-white min-h-screen py-6">
        <div className="container mx-auto px-4 max-w-5xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h1 className="text-2xl font-normal">Your Orders</h1>
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                        type="text" 
                        placeholder="Search all orders" 
                        className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none shadow-inner"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="absolute right-0 top-0 h-full bg-[#303333] text-white px-4 rounded-r-md text-sm font-medium hover:bg-black">
                        Search Orders
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6 flex gap-6 text-sm">
                <button className="font-bold border-b-2 border-[#D4AF37] pb-2 text-black">Orders</button>
                <button className="text-[#007185] hover:text-[#c7511f] pb-2 hover:underline">Buy Again</button>
                <button className="text-[#007185] hover:text-[#c7511f] pb-2 hover:underline">Not Yet Shipped</button>
                <button className="text-[#007185] hover:text-[#c7511f] pb-2 hover:underline">Cancelled Orders</button>
            </div>

            {/* Orders List */}
            <div className="space-y-6">
                {filteredOrders.length === 0 ? (
                    <div className="border border-gray-300 rounded p-8 text-center text-gray-600">
                        <div className="mb-4">No orders found matching your search.</div>
                         <Link to="/" className="bg-black hover:bg-gray-900 border border-black rounded-md px-4 py-2 text-sm shadow-sm text-[#D4AF37] inline-block">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    filteredOrders.map(order => (
                        <div key={order.id} className="border border-gray-300 rounded-lg overflow-hidden">
                            {/* Order Header */}
                            <div className="bg-[#f0f2f2] p-4 text-xs text-gray-600 flex flex-col md:flex-row justify-between gap-4 border-b border-gray-300">
                                <div className="flex gap-8">
                                    <div className="flex flex-col">
                                        <span className="uppercase font-bold mb-1">Order Placed</span>
                                        <span>{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="uppercase font-bold mb-1">Total</span>
                                        <span>₹{order.total.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="uppercase font-bold mb-1">Ship To</span>
                                        <span className="text-[#007185] hover:underline cursor-pointer truncate max-w-[150px]">{order.shippingAddress.split(',')[0]}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start md:items-end">
                                    <span className="uppercase font-bold mb-1">Order # {order.id}</span>
                                    <div className="flex gap-2">
                                        <span className="text-[#007185] hover:underline cursor-pointer">View order details</span>
                                        <span className="text-gray-300">|</span>
                                        <span className="text-[#007185] hover:underline cursor-pointer">Invoice</span>
                                    </div>
                                </div>
                            </div>

                            {/* Order Body */}
                            <div className="p-4 bg-white">
                                <div className="mb-4">
                                    {renderStatus(order.status, order.estimatedDelivery)}
                                    {renderProgressBar(order.status)}
                                </div>

                                {order.items.map(item => (
                                    <div key={item.id} className="flex flex-col md:flex-row gap-4 mb-6 last:mb-0">
                                        <Link to={`/product/${item.id}`} className="shrink-0">
                                            <img src={item.image} alt={item.title} className="w-24 h-24 object-contain" />
                                        </Link>
                                        <div className="flex-1">
                                            <Link to={`/product/${item.id}`} className="text-[#007185] hover:underline hover:text-[#c7511f] font-medium line-clamp-2 mb-1">
                                                {item.title}
                                            </Link>
                                            <div className="text-xs text-gray-500 mb-2">
                                                Return window closed on {new Date(new Date(order.date).getTime() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')}
                                            </div>
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => handleBuyAgain(item)}
                                                    className="bg-black hover:bg-gray-900 border border-black rounded-md px-3 py-1 text-sm shadow-sm text-[#D4AF37]"
                                                >
                                                    Buy it again
                                                </button>
                                                <button className="bg-white hover:bg-gray-50 border border-gray-300 rounded-md px-3 py-1 text-sm shadow-sm">
                                                    View your item
                                                </button>
                                            </div>
                                        </div>
                                        {/* Action Buttons for Order */}
                                        <div className="w-full md:w-64 flex flex-col gap-2 pt-2">
                                            <button className="w-full bg-white hover:bg-gray-50 border border-gray-300 rounded-md py-1.5 text-sm shadow-sm">
                                                Track package
                                            </button>
                                            <button className="w-full bg-white hover:bg-gray-50 border border-gray-300 rounded-md py-1.5 text-sm shadow-sm">
                                                Write a product review
                                            </button>
                                            {(order.status === 'Processing' || order.status === 'Shipped') && (
                                                <button 
                                                    onClick={() => handleCancelOrder(order.id)}
                                                    className="w-full bg-white hover:bg-red-50 border border-gray-300 rounded-md py-1.5 text-sm shadow-sm text-red-600 hover:text-red-700"
                                                >
                                                    Cancel Order
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    </div>
  );
};

export default Orders;