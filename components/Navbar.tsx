import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, User, MapPin, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Category } from '../types';

const Navbar: React.FC = () => {
  const { cartCount, user, login, logout } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <nav className="bg-[#131921] text-white sticky top-0 z-50">
      {/* Top Bar */}
      <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-4 h-16">
        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 min-w-fit">
          <span className="text-3xl font-serif font-bold tracking-widest text-[#D4AF37]">JIOM</span>
        </Link>

        {/* Delivery Location (Desktop) */}
        <div className="hidden md:flex flex-col text-xs leading-tight text-gray-300 hover:text-white cursor-pointer hover:outline outline-1 outline-white p-2 rounded-sm">
          <span className="text-gray-400 ml-3">Deliver to {user ? user.name.split(' ')[0] : 'Guest'}</span>
          <div className="flex items-center font-bold text-white">
            <MapPin className="w-3 h-3 mr-1" />
            <span>India</span>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 hidden md:flex h-10 rounded-md overflow-hidden focus-within:ring-2 ring-[#D4AF37]">
          <select className="bg-gray-100 text-gray-700 text-xs px-2 border-r border-gray-300 w-16">
            <option>All</option>
            <option>Electronics</option>
            <option>Fashion</option>
          </select>
          <input
            type="text"
            className="flex-1 px-3 text-black outline-none"
            placeholder="Search JIOM"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="bg-black hover:bg-gray-900 px-4 flex items-center justify-center">
            <Search className="w-5 h-5 text-[#D4AF37]" />
          </button>
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-4 md:gap-6 min-w-fit">
          {/* Account */}
          <div className="relative group cursor-pointer hover:outline outline-1 outline-white p-2 rounded-sm" onClick={user ? undefined : login}>
            <div className="text-xs text-gray-300">Hello, {user ? user.name.split(' ')[0] : 'sign in'}</div>
            <div className="text-sm font-bold flex items-center">
              Account & Lists
            </div>
            {/* Dropdown for Logged in User */}
            {user && (
              <div className="absolute top-full right-0 w-48 bg-white text-black shadow-lg rounded-md hidden group-hover:block p-2">
                 <Link to="/admin" className="block px-4 py-2 hover:bg-gray-100 text-sm">Admin Dashboard</Link>
                 <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100 text-sm">Your Orders</Link>
                 <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">Sign Out</button>
              </div>
            )}
          </div>

          {/* Orders */}
          <Link to="/orders" className="hidden md:block cursor-pointer hover:outline outline-1 outline-white p-2 rounded-sm">
            <div className="text-xs text-gray-300">Returns</div>
            <div className="text-sm font-bold">& Orders</div>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="flex items-end gap-1 hover:outline outline-1 outline-white p-2 rounded-sm relative">
            <div className="relative">
              <ShoppingCart className="w-8 h-8" />
              <span className="absolute -top-1 -right-1 bg-black text-[#D4AF37] font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full border border-[#D4AF37]">
                {cartCount}
              </span>
            </div>
            <span className="font-bold text-sm hidden md:inline mb-1">Cart</span>
          </Link>
        </div>
      </div>

      {/* Sub Navbar (Categories) */}
      <div className="bg-[#232f3e] text-white text-sm px-4 py-2 flex items-center gap-4 overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-1 font-bold cursor-pointer" onClick={() => setIsMobileMenuOpen(true)}><Menu className="w-4 h-4"/> All</div>
        <Link to={`/?category=${Category.HOME}`} className="hover:outline outline-1 outline-white px-2 py-1">Fresh</Link>
        <Link to={`/?category=${Category.ELECTRONICS}`} className="hover:outline outline-1 outline-white px-2 py-1">Mobiles</Link>
        <Link to="/?sort=rating" className="hover:outline outline-1 outline-white px-2 py-1">Best Sellers</Link>
        <Link to="/?sort=featured" className="hover:outline outline-1 outline-white px-2 py-1">Today's Deals</Link>
        <Link to={`/?category=${Category.FASHION}`} className="hover:outline outline-1 outline-white px-2 py-1">Fashion</Link>
        <Link to={`/?category=${Category.ELECTRONICS}`} className="hover:outline outline-1 outline-white px-2 py-1">Electronics</Link>
        <Link to="/?sort=featured" className="hover:outline outline-1 outline-white px-2 py-1">Prime</Link>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex">
          <div className="bg-white w-[80%] max-w-sm h-full text-black flex flex-col">
            <div className="bg-[#232f3e] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-6 h-6" />
                <span className="font-bold">Browse JIOM</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)}><X className="w-6 h-6"/></button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
               <h3 className="font-bold text-lg mb-4">Trending</h3>
               <ul className="space-y-4 text-sm text-gray-700">
                 <li><Link to="/?sort=rating" onClick={() => setIsMobileMenuOpen(false)} className="block w-full">Best Sellers</Link></li>
                 <li><Link to="/?sort=featured" onClick={() => setIsMobileMenuOpen(false)} className="block w-full">New Releases</Link></li>
                 <li><Link to="/?sort=price-low-high" onClick={() => setIsMobileMenuOpen(false)} className="block w-full">Movers and Shakers</Link></li>
               </ul>
               <div className="border-t my-4"></div>
               <h3 className="font-bold text-lg mb-4">Shop By Category</h3>
               <ul className="space-y-4 text-sm text-gray-700">
                 <li><Link to={`/?category=${Category.ELECTRONICS}`} onClick={() => setIsMobileMenuOpen(false)} className="block w-full">Mobiles, Computers</Link></li>
                 <li><Link to={`/?category=${Category.HOME}`} onClick={() => setIsMobileMenuOpen(false)} className="block w-full">TV, Appliances, Electronics</Link></li>
                 <li><Link to={`/?category=${Category.FASHION}`} onClick={() => setIsMobileMenuOpen(false)} className="block w-full">Men's Fashion</Link></li>
                 <li><Link to={`/?category=${Category.FASHION}`} onClick={() => setIsMobileMenuOpen(false)} className="block w-full">Women's Fashion</Link></li>
               </ul>
               <div className="border-t my-4"></div>
               <h3 className="font-bold text-lg mb-4">My Account</h3>
               <ul className="space-y-4 text-sm text-gray-700">
                 <li><Link to="/orders" onClick={() => setIsMobileMenuOpen(false)} className="block w-full">Your Orders</Link></li>
                 <li><Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="block w-full">Cart</Link></li>
               </ul>
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)}></div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;