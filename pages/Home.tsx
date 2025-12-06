import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';
import { Category, SortOption } from '../types';
import ProductCard from '../components/ProductCard';
import BannerCarousel from '../components/BannerCarousel';
import { Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 24;

const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category');
  const sortParam = searchParams.get('sort');
  
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState<number>(100000);
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [showFilters, setShowFilters] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce Price Slider to prevent lag on huge lists
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedMaxPrice(maxPrice);
    }, 300); // Wait 300ms after user stops sliding
    return () => clearTimeout(timer);
  }, [maxPrice]);

  // Sync state with URL params
  useEffect(() => {
    if (categoryParam) {
      const isValidCategory = Object.values(Category).includes(categoryParam as Category);
      if (isValidCategory) {
        setSelectedCategory(categoryParam as Category);
      }
    } else if (!initialSearch) {
        setSelectedCategory('All');
    }

    if (sortParam) {
        if (['featured', 'price-low-high', 'price-high-low', 'rating'].includes(sortParam)) {
            setSortOption(sortParam as SortOption);
        }
    }
  }, [categoryParam, sortParam, initialSearch]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [initialSearch, selectedCategory, debouncedMaxPrice, sortOption]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Derived state for filtered products (Expensive calculation)
  const filteredProducts = useMemo(() => {
    let result = MOCK_PRODUCTS; // Use the reference directly, don't spread 2000 items yet

    // Filter by Search
    if (initialSearch) {
      const searchLower = initialSearch.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(searchLower));
    }

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by Price (Use Debounced Value)
    result = result.filter(p => p.price <= debouncedMaxPrice);

    // Sort (Create a copy before sorting to avoid mutating original)
    result = [...result]; 
    switch (sortOption) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured - randomized in mock, but keep stable sort here
        break;
    }

    return result;
  }, [initialSearch, selectedCategory, debouncedMaxPrice, sortOption]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const lastPageIndex = firstPageIndex + ITEMS_PER_PAGE;
      return filteredProducts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredProducts]);

  const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg className={`w-4 h-4 ${filled ? 'fill-current' : 'text-gray-300 fill-gray-300'}`} viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Sliding Hero Banner */}
      {!initialSearch && selectedCategory === 'All' && sortOption === 'featured' && (
          <BannerCarousel />
      )}

      <div className={`container mx-auto px-4 py-6 ${!initialSearch && selectedCategory === 'All' && sortOption === 'featured' ? '-mt-20 relative z-10' : ''}`}>
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Mobile Filter Toggle */}
          <button className="md:hidden flex items-center gap-2 bg-white p-2 rounded shadow mb-4" onClick={() => setShowFilters(!showFilters)}>
             <Filter className="w-4 h-4"/> Filters
          </button>

          {/* Sidebar Filters */}
          <aside className={`w-full md:w-64 bg-white p-4 rounded shadow-sm h-fit ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="flex justify-between items-center mb-4 md:hidden">
                <h3 className="font-bold">Filters</h3>
                <button onClick={() => setShowFilters(false)}><X className="w-4 h-4"/></button>
            </div>
            
            <div className="mb-6">
              <h3 className="font-bold text-sm mb-2">Category</h3>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm hover:text-[#c7511f] cursor-pointer">
                  <input type="radio" name="category" checked={selectedCategory === 'All'} onChange={() => setSelectedCategory('All')} className="accent-[#D4AF37]" /> All
                </label>
                {Object.values(Category).map(cat => (
                  <label key={cat} className="flex items-center gap-2 text-sm hover:text-[#c7511f] cursor-pointer">
                    <input type="radio" name="category" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} className="accent-[#D4AF37]" /> {cat}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-sm mb-2">Price Range</h3>
              <input 
                type="range" 
                min="0" 
                max="100000" 
                step="1000"
                value={maxPrice} 
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#D4AF37]"
              />
              <div className="text-sm text-gray-600 mt-1">Up to ₹{maxPrice.toLocaleString('en-IN')}</div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-sm mb-2">Customer Review</h3>
              <div className="space-y-1 text-sm text-gray-600">
                  {[4, 3, 2, 1].map(star => (
                      <div key={star} className="flex items-center gap-1 cursor-pointer hover:text-[#c7511f]">
                          <div className="flex text-[#febd69]">
                            {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < star} />)}
                          </div>
                          <span>& Up</span>
                      </div>
                  ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
             <div className="flex justify-between items-center mb-4 bg-white p-3 rounded shadow-sm">
                <h2 className="font-bold text-lg">Results <span className="text-gray-500 text-sm font-normal">({filteredProducts.length} items)</span></h2>
                <select 
                    className="border border-gray-300 rounded px-2 py-1 text-sm bg-gray-50 hover:bg-gray-100 cursor-pointer"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                >
                    <option value="featured">Featured</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="rating">Avg. Customer Review</option>
                </select>
             </div>

             {filteredProducts.length === 0 ? (
                 <div className="bg-white p-10 text-center rounded shadow-sm">
                     <p className="text-gray-500">No products found matching your criteria.</p>
                     <button onClick={() => {setMaxPrice(100000); setSelectedCategory('All');}} className="mt-4 text-blue-600 hover:underline">Clear Filters</button>
                 </div>
             ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {currentProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center mt-8 gap-2 pb-8">
                            <button 
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                            >
                                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                            </button>
                            
                            <span className="text-sm text-gray-700 px-4">
                                Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                            </span>

                            <button 
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                            >
                                Next <ChevronRight className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    )}
                </>
             )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;