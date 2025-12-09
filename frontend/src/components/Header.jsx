import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const headerRef = useRef(null);
  const navigate = useNavigate();

  // All categories for desktop
  const allCategories = [
    { 
      name: 'CARS', 
      path: '/category/cars',
      subcategories: [
        { name: 'HOTWHEELS CARS', path: '/category/cars/hotwheels-cars' },
        { name: 'SUPERCARS', path: '/category/cars/supercars' },
        { name: 'CLASSIC CARS', path: '/category/cars/classic-cars' },
        { name: 'SPORTS CARS', path: '/category/cars/sports-cars' },
        { name: 'LUXURY CARS', path: '/category/cars/luxury-cars' },
        { name: 'DRIFT CARS', path: '/category/cars/drift-cars' }
      ]
    },
    { 
      name: 'SUVS', 
      path: '/category/suvs',
      subcategories: [
        { name: 'OFF-ROAD SUVS', path: '/category/suvs/off-road-suvs' },
        { name: 'MONSTER SUVS', path: '/category/suvs/monster-suvs' },
        { name: 'PREMIUM SUVS', path: '/category/suvs/premium-suvs' }
      ]
    },
    { 
      name: 'TRUCKS', 
      path: '/category/trucks',
      subcategories: [
        { name: 'MONSTER TRUCKS', path: '/category/trucks/monster-trucks' },
        { name: 'PICKUP TRUCKS', path: '/category/trucks/pickup-trucks' },
        { name: 'HEAVY-DUTY TRUCKS', path: '/category/trucks/heavy-duty-trucks' }
      ]
    },
    {
      name: 'BIKES', 
      path: '/category/bikes',
      subcategories: [
        { name: 'SPORTS BIKES', path: '/category/bikes/sports-bikes' },
        { name: 'DIRT BIKES', path: '/category/bikes/dirt-bikes' },
        { name: 'SUPERBIKES', path: '/category/bikes/superbikes' }
      ]
    },
    { 
      name: 'CONSTRUCTION TOYS', 
      path: '/category/construction-toys',
      subcategories: [
        { name: 'BULLDOZER', path: '/category/construction-toys/bulldozer' },
        { name: 'EXCAVATOR', path: '/category/construction-toys/excavator' },
        { name: 'CRANE', path: '/category/construction-toys/crane' },
        { name: 'LOADER', path: '/category/construction-toys/loader' }
      ]
    },
    { 
      name: 'FARM VEHICLES', 
      path: '/category/farm-vehicles',
      subcategories: [
        { name: 'TRACTORS', path: '/category/farm-vehicles/tractors' },
        { name: 'HARVESTERS', path: '/category/farm-vehicles/harvesters' },
        { name: 'FARM MACHINES', path: '/category/farm-vehicles/farm-machines' }
      ]
    },
    { 
      name: 'REMOTE CONTROL (RC) VEHICLES', 
      path: '/category/rc-vehicles',
      subcategories: [
        { name: 'RC CARS', path: '/category/rc-vehicles/rc-cars' },
        { name: 'RC MONSTER TRUCKS', path: '/category/rc-vehicles/rc-monster-trucks' },
        { name: 'RC OFF-ROAD VEHICLES', path: '/category/rc-vehicles/rc-off-road-vehicles' }
      ]
    },
    { 
      name: 'NEW ARRIVALS', 
      path: '/category/new-arrivals',
      subcategories: [
        { name: 'LATEST TOY CARS', path: '/category/new-arrivals/latest-toy-cars' },
        { name: 'TRENDING ITEMS', path: '/category/new-arrivals/trending-items' }
      ]
    },
    { 
      name: 'COLLECTIONS', 
      path: '/category/collections',
      subcategories: [
        { name: 'PREMIUM COLLECTION', path: '/category/collections/premium-collection' },
        { name: 'LIMITED EDITION', path: '/category/collections/limited-edition' },
        { name: 'BEST SELLERS', path: '/category/collections/best-sellers' }
      ]
    }
  ];

  // Mobile view: Only show CARS, SUVS, SPORTS, TRUCKS, BIKES
  const mobileCategories = [
    { name: 'CARS', path: '/category/cars' },
    { name: 'SUVS', path: '/category/suvs' },
    { name: 'SPORTS', path: '/category/sports' },
    { name: 'TRUCKS', path: '/category/trucks' },
    { name: 'BIKES', path: '/category/bikes' }
  ];

  // Use allCategories for desktop, mobileCategories for mobile
  const categories = allCategories;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setActiveCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClick = (categoryName, e) => {
    // Only toggle category if it's not a link click
    if (e && e.target.tagName === 'A') {
      if (window.innerWidth < 768) {
        setActiveCategory(null);
      }
      return;
    }
    setActiveCategory(prev => (prev === categoryName ? null : categoryName));
  };

  return (
    <header className="md:hidden sticky top-16 md:top-20 z-40 border-t border-gray-200 shadow-sm" style={{ backgroundColor: '#FEF8DD' }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-0">
        {/* Desktop Navigation - Hidden on all screens now */}
        <div className="hidden md:flex items-center justify-center space-x-8 py-3" ref={headerRef}>
          {categories.map((category) => (
            <div key={category.name} className="relative group">
              <div 
                className={`flex items-center text-gray-700 hover:text-rose-500 font-medium text-sm whitespace-nowrap transition-colors duration-200 relative cursor-pointer ${
                  activeCategory === category.name ? 'text-rose-500' : ''
                }`}
                onClick={() => handleClick(category.name)}
                style={{ fontFamily: "'HK Modular', sans-serif" }}
              >
                {category.name}
                <svg
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                    activeCategory === category.name ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-amber-400 group-hover:w-full transition-all duration-300"></span>
              </div>

              {/* Dropdown */}
              {category.subcategories && activeCategory === category.name && (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 z-50">
                  <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden w-56">
                    <Link
                      to={category.path}
                      className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-rose-500 border-b border-gray-100"
                      onClick={() => setActiveCategory(null)}
                      style={{ fontFamily: "'HK Modular', sans-serif" }}
                    >
                      All {category.name}
                    </Link>
                    <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.name}
                          to={subcategory.path}
                          className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-rose-50 hover:text-rose-500 transition-colors duration-150"
                          onClick={() => setActiveCategory(null)}
                          style={{ fontFamily: "'HK Modular', sans-serif" }}
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Navigation - Horizontal Scroll - Only Main Categories */}
        <div className="md:hidden -mx-4 relative z-50">
          {/* Main Categories - Direct Links, No Subcategories - Centered */}
          <div className="flex justify-center items-center space-x-1 overflow-x-auto px-4 pt-2 pb-1.5 hide-scrollbar sticky top-16 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-gray-200" style={{ backgroundColor: '#FEF8DD' }}>
            {mobileCategories.map((category) => (
              <div key={category.name} className="shrink-0">
                <Link
                  to={category.path}
                  onClick={() => {
                      setActiveCategory(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-2 py-0.5 text-xs font-medium transition-colors duration-200 whitespace-nowrap relative flex items-center text-gray-700 hover:text-rose-500 border-b-2 border-transparent hover:border-rose-500"
                  style={{ fontFamily: "'HK Modular', sans-serif" }}
                >
                  {category.name}
                </Link>
              </div>
            ))}
          </div>
          
          <style jsx>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
              height: 0;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
              scrollbar-height: none;
            }
            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: #e5e7eb #f9fafb;
            }
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: #f9fafb;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background-color: #e5e7eb;
              border-radius: 3px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background-color: #d1d5db;
            }
          `}</style>
        </div>
      </div>
    </header>
  );
};

export default Header;
