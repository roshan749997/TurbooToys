import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaRupeeSign, FaSpinner, FaFilter, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { fetchSarees } from '../services/api';

// Add CSS to hide scrollbar and loading animation
const styles = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(300%);
    }
  }
`;

const ProductList = ({ defaultCategory } = {}) => {
  const { categoryName, subCategoryName } = useParams();
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Filter states
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [customPriceFrom, setCustomPriceFrom] = useState('');
  const [customPriceTo, setCustomPriceTo] = useState('');
  
  // Accordion states for desktop filters
  const [openSections, setOpenSections] = useState({
    price: true
  });
  
  const priceRanges = [
    { id: 1, label: '₹300 - ₹1,000', min: 300, max: 1000 },
    { id: 2, label: '₹1,001 - ₹2,000', min: 1001, max: 2000 },
    { id: 3, label: '₹2,001 - ₹3,000', min: 2001, max: 3000 },
    { id: 4, label: '₹3,001 - ₹4,000', min: 3001, max: 4000 },
    { id: 5, label: '₹4,001 - ₹5,000', min: 4001, max: 5000 },
    { id: 6, label: '₹5,001 - ₹6,000', min: 5001, max: 6000 },
    { id: 7, label: '₹6,001 - ₹7,000', min: 6001, max: 7000 },
    { id: 8, label: '₹7,001 - ₹8,000', min: 7001, max: 8000 },
    { id: 9, label: '₹8,001 - ₹10,000', min: 8001, max: 10000 },
    { id: 10, label: 'Above ₹10,000', min: 10001, max: Infinity },
  ];
  
  const normalize = (s) => {
    if (!s) return '';
    const t = s.replace(/-/g, ' ').toLowerCase();
    return t.replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const effectiveCategory = subCategoryName
    ? normalize(subCategoryName)
    : (categoryName || defaultCategory) ? normalize(categoryName || defaultCategory) : '';
  
  // Fetch products
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        // Clear products immediately when category changes
        setProducts([]);
        setFilteredProducts([]);
        const data = await fetchSarees(effectiveCategory || '');
        setProducts(data || []);
        setFilteredProducts(data || []);
      } catch (err) {
        console.error('Failed to load products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [effectiveCategory]);
  
  // Apply filters
  useEffect(() => {
    let result = [...products];
    
    // Filter by price range
    if (selectedPriceRange) {
      const range = priceRanges.find(r => r.id === selectedPriceRange);
      if (range) {
        result = result.filter(p => {
          const price = p.price || (p.mrp - p.mrp * ((p.discountPercent || 0) / 100));
          return price >= range.min && price <= range.max;
        });
      }
    }
    
    setFilteredProducts(result);
  }, [products, selectedPriceRange]);
  
  const resetFilters = () => {
    setSelectedPriceRange(null);
  };

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

    
  // Scroll to top whenever category changes so the heading/top section is visible
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categoryName, subCategoryName]);

  const handleCardClick = (product) => {
    navigate(`/product/${product._id}`);
  };

  const activeFilterCount = selectedPriceRange ? 1 : 0;

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {activeFilterCount > 0 && (
          <button 
            onClick={resetFilters}
            className="text-sm text-[#02050B] hover:text-[#03070F] font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="border-b border-gray-200 pb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex justify-between items-center w-full mb-4"
        >
          <h4 className="text-sm font-medium text-gray-900">Price</h4>
          {openSections.price ? <FaChevronUp className="text-gray-400" /> : <FaChevronDown className="text-gray-400" />}
        </button>
        
        {openSections.price && (
          <div className="space-y-3">
            {priceRanges.map(range => (
              <div key={range.id} className="flex items-center">
                <input
                  type="radio"
                  id={`price-${range.id}`}
                  name="priceRange"
                  checked={selectedPriceRange === range.id}
                  onChange={() => setSelectedPriceRange(range.id)}
                  className="h-4 w-4 text-[#02050B] focus:ring-[#02050B] border-gray-300 cursor-pointer accent-[#02050B]"
                />
                <label htmlFor={`price-${range.id}`} className="ml-3 text-sm text-gray-700 cursor-pointer">
                  {range.label}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
      
    </div>
  );

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{styles}</style>
      {loading && (
        <div className="fixed left-0 right-0 top-0 z-50">
          <div className="h-1 bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[shimmer_1.5s_infinite]"></div>
          </div>
        </div>
      )}

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6 sticky top-0 bg-gray-50 pt-6 pb-2 z-10">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 tracking-wide text-center mb-3">
              {subCategoryName
                ? normalize(subCategoryName)
                : (categoryName || defaultCategory
                    ? normalize(categoryName || defaultCategory)
                    : 'All Sarees')}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#7A2A2A] via-[#A56E2C] to-[#C89D4B] rounded-full"></div>
          </div>
        </div>

        <div className="flex gap-6 relative">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-32 bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide">
              <FilterContent />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Button & Active Filters */}
            <div className="lg:hidden mb-4 space-y-3">
              <button 
                onClick={() => setShowMobileFilters(true)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-[#02050B] to-[#1a1f2e] text-white border border-[#02050B] rounded-lg hover:from-[#03070F] hover:to-[#252a3a] shadow-md transition-all duration-300"
              >
                <FaFilter className="text-white" />
                <span className="font-medium">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="ml-2 px-2.5 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/30">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Active Filters Pills */}
              {activeFilterCount > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedPriceRange && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#02050B] to-[#1a1f2e] text-white shadow-sm border border-[#02050B]/20">
                      {priceRanges.find(r => r.id === selectedPriceRange)?.label}
                      <button 
                        onClick={() => setSelectedPriceRange(null)}
                        className="ml-2 hover:text-gray-300 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  
                  {(customPriceFrom || customPriceTo) && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#02050B] to-[#1a1f2e] text-white shadow-sm border border-[#02050B]/20">
                      ₹{customPriceFrom || '0'} - ₹{customPriceTo || '∞'}
                      <button 
                        onClick={() => {
                          setCustomPriceFrom('');
                          setCustomPriceTo('');
                        }}
                        className="ml-2 hover:text-gray-300 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Results Bar */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 bg-gradient-to-r from-white to-gray-50 p-4 rounded-lg shadow-md border border-gray-200">
              <p className="text-sm text-gray-700">
                Showing <span className="font-bold text-[#02050B]">{filteredProducts.length}</span> products
              </p>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm font-medium text-gray-700 whitespace-nowrap">Sort by:</label>
                <select 
                  id="sort" 
                  className="text-sm border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#02050B] focus:border-[#02050B] bg-white px-3 py-1.5 font-medium text-gray-700 cursor-pointer transition-all"
                  onChange={(e) => {
                    const sorted = [...filteredProducts];
                    switch(e.target.value) {
                      case 'price-low-high':
                        sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
                        break;
                      case 'price-high-low':
                        sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
                        break;
                      case 'newest':
                        sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
                        break;
                      default:
                        break;
                    }
                    setFilteredProducts(sorted);
                  }}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>
            
            {/* Product Grid */}
            {loading ? (
              <div className="relative min-h-[400px] flex items-center justify-center">
                {/* Rounded Loading Spinner */}
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                    <div className="w-16 h-16 border-4 border-[#02050B] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                  </div>
                  <p className="text-[#02050B] font-semibold">Loading products...</p>
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-sm border-2 border-dashed border-gray-200">
                <div className="mb-4">
                  <svg className="w-20 h-20 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p className="text-gray-600 text-lg font-medium mb-2">No products found matching your filters.</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-6 py-2.5 bg-[#02050B] hover:bg-[#03070F] text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                {filteredProducts.map((p) => (
                  <div
                    key={p._id || p.title}
                    className="group bg-white overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-gray-200 hover:border-[#02050B] rounded-lg"
                    onClick={() => handleCardClick(p)}
                  >
                    <div className="relative w-full aspect-[3/4] bg-gray-50">
                      <img
                        src={p.images?.image1 || 'https://via.placeholder.com/300x400?text=Image+Not+Available'}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/300x400?text=Image+Not+Available';
                        }}
                      />
                      {(p.discountPercent > 0 || p.discount) && (
                        <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full whitespace-nowrap border-2 border-white">
                          {p.discountPercent || p.discount}% OFF
                        </span>
                      )}
                    </div>

                    <div className="relative p-4 bg-gradient-to-b from-white to-gray-50">
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#02050B] via-[#1a1f2e] to-[#02050B] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10"></div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-xs font-semibold text-[#02050B] uppercase tracking-wide line-clamp-1">
                          {p.product_info?.manufacturer || 'TURBOOTOYS'}
                        </h3>
                      </div>
                      <p className="text-sm font-bold text-gray-900 line-clamp-2 mb-2 min-h-[2.5rem] group-hover:text-[#02050B] transition-colors">{p.title || 'Untitled Product'}</p>
                
                      <div className="flex items-baseline gap-1.5 mt-2">
                        <div className="flex items-center">
                          <FaRupeeSign className="h-4 w-4 text-[#02050B]" />
                          <span className="text-xl font-bold text-[#02050B] ml-0.5">
                            {p.price?.toLocaleString() || Math.round(p.mrp - p.mrp * ((p.discountPercent || 0) / 100)).toLocaleString()}
                          </span>
                        </div>
                        {p.mrp && (
                          <span className="text-sm text-gray-400 line-through">
                            ₹{p.mrp.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowMobileFilters(false)}></div>
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-[#02050B] to-[#1a1f2e] border-b-2 border-[#02050B] px-6 py-4 flex justify-between items-center z-10 shadow-md">
              <h3 className="text-lg font-bold text-white">Filters</h3>
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="text-white hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-white/10"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <FilterContent />
            </div>
            <div className="sticky bottom-0 bg-gradient-to-r from-white to-gray-50 border-t-2 border-gray-200 px-6 py-4 shadow-lg">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#02050B] to-[#1a1f2e] text-white font-semibold rounded-lg hover:from-[#03070F] hover:to-[#252a3a] transition-all duration-300 shadow-md transform hover:scale-[1.02]"
              >
                Show {filteredProducts.length} Products
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;