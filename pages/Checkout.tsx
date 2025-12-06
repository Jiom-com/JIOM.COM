import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Lock } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cartTotal, cartCount, placeOrder } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Mock Address
  const shippingAddress = "Aditya Kumar, 123, Tech Park, Sector 5, Bangalore, Karnataka 560001";

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
        placeOrder(shippingAddress);
        setLoading(false);
        navigate('/orders');
    }, 2000);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Checkout Header */}
      <header className="border-b border-gray-200 py-4 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 flex justify-between items-center">
              <div className="flex items-end">
                <span className="text-3xl font-serif font-bold text-[#D4AF37] tracking-widest leading-none">JIOM</span>
                <span className="text-gray-500 font-normal text-xl ml-2 leading-none mb-0.5">Checkout</span>
              </div>
              <div className="text-gray-600 text-sm"><Lock className="w-3 h-3 inline mr-1"/> Secure Connection</div>
          </div>
      </header>

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
              
              {/* Step 1: Address */}
              <div className={`border rounded-md ${step === 1 ? 'border-gray-300' : 'border-gray-200'}`}>
                  <div className={`p-4 flex justify-between ${step === 1 ? 'bg-gray-100 font-bold' : 'text-gray-500'}`}>
                      <h3>1. Delivery Address</h3>
                      {step > 1 && <span className="text-sm text-blue-600 cursor-pointer" onClick={() => setStep(1)}>Change</span>}
                  </div>
                  {step === 1 && (
                      <div className="p-4 bg-white">
                          <p className="font-bold">Aditya Kumar</p>
                          <p className="text-sm">123, Tech Park, Sector 5</p>
                          <p className="text-sm">Bangalore, Karnataka 560001</p>
                          <p className="text-sm">India</p>
                          <button onClick={() => setStep(2)} className="mt-4 bg-black text-[#D4AF37] px-4 py-2 rounded-lg text-sm font-medium shadow-sm">Use this address</button>
                      </div>
                  )}
              </div>

              {/* Step 2: Payment */}
              <div className={`border rounded-md ${step === 2 ? 'border-gray-300' : 'border-gray-200'}`}>
                  <div className={`p-4 flex justify-between ${step === 2 ? 'bg-gray-100 font-bold' : 'text-gray-500'}`}>
                      <h3>2. Payment Method</h3>
                      {step > 2 && <span className="text-sm text-blue-600 cursor-pointer" onClick={() => setStep(2)}>Change</span>}
                  </div>
                  {step === 2 && (
                      <div className="p-4 bg-white space-y-3">
                          <div className="border border-orange-500 bg-orange-50 p-3 rounded flex items-center gap-3">
                              <input type="radio" name="payment" checked readOnly className="accent-orange-500"/>
                              <span className="font-medium">Pay with Debit/Credit/ATM Card</span>
                          </div>
                          <div className="border border-gray-200 p-3 rounded flex items-center gap-3 text-gray-500">
                              <input type="radio" name="payment" disabled />
                              <span>UPI / Net Banking</span>
                          </div>
                          <div className="border border-gray-200 p-3 rounded flex items-center gap-3 text-gray-500">
                              <input type="radio" name="payment" disabled />
                              <span>Cash on Delivery</span>
                          </div>
                          <button onClick={() => setStep(3)} className="mt-4 bg-black text-[#D4AF37] px-4 py-2 rounded-lg text-sm font-medium shadow-sm">Use this payment method</button>
                      </div>
                  )}
              </div>

              {/* Step 3: Review */}
              <div className={`border rounded-md ${step === 3 ? 'border-gray-300' : 'border-gray-200'}`}>
                  <div className={`p-4 ${step === 3 ? 'bg-gray-100 font-bold' : 'text-gray-500'}`}>
                      <h3>3. Review items and delivery</h3>
                  </div>
                  {step === 3 && (
                      <div className="p-4 bg-white">
                          <div className="border border-green-200 bg-green-50 p-3 rounded mb-4 text-sm text-green-800">
                              Guaranteed delivery: <strong>Tomorrow</strong>
                          </div>
                          <button 
                            onClick={handlePlaceOrder}
                            disabled={loading}
                            className="bg-black text-[#D4AF37] w-full md:w-auto px-6 py-2 rounded-lg text-sm font-medium shadow-sm"
                          >
                              {loading ? 'Processing...' : 'Place your order'}
                          </button>
                          <div className="mt-2 text-xs text-gray-500">
                            By placing your order, you agree to JIOM's privacy notice and conditions of use.
                          </div>
                      </div>
                  )}
              </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full md:w-80 h-fit border border-gray-200 rounded-lg bg-white p-4 sticky top-4">
              <button 
                onClick={handlePlaceOrder}
                disabled={loading || step < 3}
                className="w-full bg-black text-[#D4AF37] hover:bg-gray-900 disabled:bg-gray-200 disabled:text-gray-400 rounded-lg py-2 text-sm font-medium shadow-sm mb-4"
              >
                 Place your order
              </button>

              <h3 className="font-bold border-b pb-2 mb-2">Order Summary</h3>
              <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                      <span>Items ({cartCount}):</span>
                      <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                      <span>Delivery:</span>
                      <span>₹0.00</span>
                  </div>
                  <div className="flex justify-between text-[#b12704] font-bold border-t pt-2 mt-2 text-lg">
                      <span>Order Total:</span>
                      <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Checkout;