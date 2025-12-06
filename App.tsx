import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import Orders from './pages/Orders';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isCheckout = location.pathname === '/checkout';
  const isAdmin = location.pathname === '/admin';

  return (
    <>
      {/* Hide standard navbar on Checkout and Admin pages for specific layouts */}
      {!isCheckout && !isAdmin && <Navbar />}
      {children}
      
      {!isCheckout && !isAdmin && (
        <footer className="bg-[#232f3e] text-white py-10 text-center text-sm mt-auto">
          <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-left px-4">
              <div>
                  <h4 className="font-bold mb-2">Get to Know Us</h4>
                  <ul className="space-y-1 text-gray-300">
                      <li>About Us</li>
                      <li>Careers</li>
                      <li>Press Releases</li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-bold mb-2">Connect with Us</h4>
                  <ul className="space-y-1 text-gray-300">
                      <li>Facebook</li>
                      <li>Twitter</li>
                      <li>Instagram</li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-bold mb-2">Make Money with Us</h4>
                  <ul className="space-y-1 text-gray-300">
                      <li>Sell on JIOM</li>
                      <li>Affiliate Marketing</li>
                      <li>Fulfilment by JIOM</li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-bold mb-2">Let Us Help You</h4>
                  <ul className="space-y-1 text-gray-300">
                      <li>COVID-19 and JIOM</li>
                      <li>Your Account</li>
                      <li>Returns Centre</li>
                  </ul>
              </div>
          </div>
          <div className="border-t border-gray-600 pt-6">
             <div className="mb-2 font-serif font-bold text-xl text-[#D4AF37] tracking-widest">JIOM</div>
             &copy; {new Date().getFullYear()} JIOM, Inc. or its affiliates
          </div>
        </footer>
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </Layout>
      </Router>
    </StoreProvider>
  );
};

export default App;