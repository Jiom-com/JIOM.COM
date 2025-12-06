import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BANNERS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    title: 'Great Indian Festival',
    subtitle: 'Up to 80% Off on Top Brands',
    cta: 'Shop Now',
    color: 'text-white'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    title: 'Latest Electronics',
    subtitle: 'Upgrade your tech game',
    cta: 'Explore Deals',
    color: 'text-white'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    title: 'Fashion Week',
    subtitle: 'Trendy styles for the season',
    cta: 'View Collection',
    color: 'text-gray-900'
  },
  {
     id: 4,
     image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
     title: 'Home & Kitchen',
     subtitle: 'Essentials for your daily life',
     cta: 'Shop Essentials',
     color: 'text-gray-900'
  }
];

const BannerCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % BANNERS.length);
  };

  return (
    <div className="relative w-full h-64 md:h-96 bg-gray-200 group overflow-hidden">
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {BANNERS.map((banner) => (
          <div key={banner.id} className="min-w-full h-full relative">
            <img 
              src={banner.image} 
              alt={banner.title} 
              className="w-full h-full object-cover"
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end pb-16 justify-center md:items-center md:pb-0 md:justify-start md:pl-20">
                <div className="hidden md:block bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 shadow-xl max-w-md">
                    <h2 className={`text-3xl md:text-5xl font-bold mb-2 ${banner.color === 'text-gray-900' ? 'text-gray-900' : 'text-white'}`}>{banner.title}</h2>
                    <p className={`text-lg mb-4 ${banner.color === 'text-gray-900' ? 'text-gray-800' : 'text-gray-200'}`}>{banner.subtitle}</p>
                    <button className="bg-black text-[#D4AF37] px-6 py-2 rounded-sm font-medium hover:bg-gray-900 transition-colors">
                        {banner.cta}
                    </button>
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button 
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-sm border border-white/50 backdrop-blur-sm focus:outline-2 focus:outline-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-gray-800" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-sm border border-white/50 backdrop-blur-sm focus:outline-2 focus:outline-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-gray-800" />
      </button>

      {/* Bottom Gradient Fade (Amazon Style) */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default BannerCarousel;