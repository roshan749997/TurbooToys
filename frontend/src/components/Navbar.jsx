import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { searchProducts } from '../services/api';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchWrapRefMobile = useRef(null);
  const searchWrapRefDesktop = useRef(null);
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const readWishlistCount = () => {
      try {
        const raw = localStorage.getItem('wishlist');
        const list = raw ? JSON.parse(raw) : [];
        setWishlistCount(Array.isArray(list) ? list.length : 0);
      } catch {
        setWishlistCount(0);
      }
    };
    readWishlistCount();
    const onStorage = (e) => {
      if (!e || e.key === 'wishlist') readWishlistCount();
    };
    const onCustom = () => readWishlistCount();
    window.addEventListener('storage', onStorage);
    window.addEventListener('wishlist:updated', onCustom);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('wishlist:updated', onCustom);
    };
  }, []);

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('auth_token');
        setIsAuthenticated(Boolean(token));
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
    
    const onStorage = (e) => {
      if (!e || e.key === 'auth_token') {
        checkAuth();
      }
    };
    
    const onAuthStateChanged = () => {
      checkAuth();
    };
    
    window.addEventListener('storage', onStorage);
    window.addEventListener('authStateChanged', onAuthStateChanged);
    
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('authStateChanged', onAuthStateChanged);
    };
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('auth_token');
    } catch {}
    setIsAuthenticated(false);
    navigate('/signin');
  };

  const handleLogin = () => {
    navigate('/signin');
  };

  const handleSearch = () => {
    const q = searchQuery.trim();
    if (!q) return;
    setSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
    if (e.key === 'Escape') {
      setSearchOpen(false);
    }
  };

  // Debounced fetch for inline search results
  useEffect(() => {
    const q = searchQuery.trim();
    if (q.length < 2) {
      setSearchResults([]);
      setSearchLoading(false);
      setSearchOpen(false);
      return;
    }
    setSearchLoading(true);
    setSearchOpen(true);
    const t = setTimeout(async () => {
      try {
        const data = await searchProducts(q);
        const items = data?.results || [];
        setSearchResults(items);
      } catch (err) {
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    const onClick = (e) => {
      const inMobile = searchWrapRefMobile.current && searchWrapRefMobile.current.contains(e.target);
      const inDesktop = searchWrapRefDesktop.current && searchWrapRefDesktop.current.contains(e.target);
      if (!inMobile && !inDesktop) setSearchOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  // Car-themed navigation links
  const navLinks = [
    { name: 'HOME', path: '/', icon: '🏠' },
    { name: 'CARS', path: '/category/cars', icon: '🚗' },
    { name: 'SUVS', path: '/category/suvs', icon: '🚙' },
    { name: 'TRACTORS', path: '/category/tractors', icon: '🏎️' },
    { name: 'TRUCKS', path: '/category/trucks', icon: '🚛' },
    { name: 'BIKES', path: '/category/bikes', icon: '🏍️' },
    { name: 'ABOUT', path: '/about', icon: 'ℹ️' },
    { name: 'CONTACT', path: '/contact', icon: '📞' },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <nav
      className={`relative z-[70] transition-all duration-300 ${
        isScrolled 
          ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl border-b border-red-600/30' 
          : 'bg-gradient-to-r from-black via-gray-900 to-black'
      }`}
    >
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600"></div>
      
      <div className="w-full px-0 sm:px-2 md:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo/Brand */}
          <Link to="/" className="flex-shrink-0 ml-0 sm:ml-1 md:ml-2 flex items-center group">
            <img 
              src="https://res.cloudinary.com/duc9svg7w/image/upload/v1765024049/Gemini_Generated_Image_6vzr4f6vzr4f6vzr-removebg-preview_soztso.png" 
              alt="TurbooWheels Logo" 
              className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/200x60/FF0000/FFFFFF?text=TURBOO+WHEELS';
              }}
            />
          </Link>

          {/* Mobile Search (visible only on small screens) */}
          <div className="flex-1 min-w-0 px-2 md:hidden">
            <div className="relative" ref={searchWrapRefMobile}>
              <input
                type="text"
                placeholder="Search cars..."
                value={searchQuery}
                onChange={(e) => { const v = e.target.value; setSearchQuery(v); setSearchOpen(v.trim().length >= 2); }}
                onKeyPress={handleSearchKeyPress}
                onFocus={() => { if (searchQuery.trim().length >= 2) setSearchOpen(true); }}
                className="w-full px-3 py-2 pl-10 text-sm border-2 border-gray-700 rounded-lg bg-gray-800/90 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 backdrop-blur-sm"
              />
              <button
                onClick={handleSearch}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                type="button"
                aria-label="Search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              {searchOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 border-2 border-gray-700 rounded-lg shadow-2xl z-[80] overflow-hidden backdrop-blur-md">
                  {searchLoading && (
                    <div className="px-4 py-3 text-sm text-gray-300 flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                      Searching…
                    </div>
                  )}
                  {!searchLoading && searchQuery.trim() && searchResults.length === 0 && (
                    <div className="px-4 py-3 text-sm text-gray-300">No cars found</div>
                  )}
                  {!searchLoading && searchResults.length > 0 && (
                    <ul className="max-h-80 overflow-auto divide-y divide-gray-700">
                      {searchResults.slice(0, 8).map((p) => (
                        <li key={p._id || p.id || p.slug}>
                          <button
                            type="button"
                            onClick={() => {
                              setSearchOpen(false);
                              navigate(`/product/${p._id || p.id || ''}`);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800/50 text-left transition-colors"
                          >
                            <img
                              src={p.images?.image1 || p.image || 'https://via.placeholder.com/60x80?text=No+Image'}
                              alt={p.title || p.name || 'Product'}
                              className="w-12 h-16 object-cover rounded-md border-2 border-gray-700"
                              onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/60x80?text=No+Image'; }}
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-white truncate">{p.title || p.name || 'Product'}</p>
                              {p.price && (
                                <p className="text-xs text-red-400 font-semibold">₹{Number(p.price).toLocaleString()}</p>
                              )}
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation - Show on md and up */}
          <div className="hidden lg:flex items-center space-x-1 ml-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={scrollToTop}
                className="group relative px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white transition-all duration-200"
              >
                <span>{link.name}</span>
                {/* Underline effect */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Search Bar & Icons */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4 ml-4 lg:ml-6 flex-1 max-w-md lg:max-w-lg">
            {/* Search Bar */}
            <div className="relative w-full" ref={searchWrapRefDesktop}>
              <input
                type="text"
                placeholder="Search cars, models..."
                value={searchQuery}
                onChange={(e) => { const v = e.target.value; setSearchQuery(v); setSearchOpen(v.trim().length >= 2); }}
                onKeyPress={handleSearchKeyPress}
                onFocus={() => { if (searchQuery.trim().length >= 2) setSearchOpen(true); }}
                className="w-full px-4 py-2 pl-10 pr-4 text-sm border-2 border-gray-700 rounded-lg bg-gray-800/90 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all duration-200 backdrop-blur-sm"
              />
              <button
                onClick={handleSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                type="button"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              {searchOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 border-2 border-gray-700 rounded-lg shadow-2xl z-[80] overflow-hidden backdrop-blur-md">
                  {searchLoading && (
                    <div className="px-4 py-3 text-sm text-gray-300 flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                      Searching…
                    </div>
                  )}
                  {!searchLoading && searchQuery.trim() && searchResults.length === 0 && (
                    <div className="px-4 py-3 text-sm text-gray-300">No cars found</div>
                  )}
                  {!searchLoading && searchResults.length > 0 && (
                    <ul className="max-h-80 overflow-auto divide-y divide-gray-700">
                      {searchResults.slice(0, 8).map((p) => (
                        <li key={p._id || p.id || p.slug}>
                          <button
                            type="button"
                            onClick={() => {
                              setSearchOpen(false);
                              navigate(`/product/${p._id || p.id || ''}`);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800/50 text-left transition-colors"
                          >
                            <img
                              src={p.images?.image1 || p.image || 'https://via.placeholder.com/60x80?text=No+Image'}
                              alt={p.title || p.name || 'Product'}
                              className="w-12 h-16 object-cover rounded-md border-2 border-gray-700"
                              onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/60x80?text=No+Image'; }}
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-white truncate">{p.title || p.name || 'Product'}</p>
                              {p.price && (
                                <p className="text-xs text-red-400 font-semibold">₹{Number(p.price).toLocaleString()}</p>
                              )}
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Desktop Navigation Icons */}
            <div className="hidden md:flex items-center space-x-2">
              <Link 
                to="/wishlist" 
                className="relative p-2.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-gray-800/50 transition-all duration-200 group"
                title="Wishlist"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold border-2 border-gray-900">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>
              <Link 
                to="/cart" 
                className="relative p-2.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-gray-800/50 transition-all duration-200 group"
                title="Cart"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold border-2 border-gray-900">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* User Icon / Login Button */}
            {isAuthenticated ? (
              <div className="flex items-center">
                <Link
                  to="/profile"
                  className="p-2.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-gray-800/50 transition-all duration-200"
                  title="Profile"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </Link>
              </div>
            ) : (
                <button
                  onClick={handleLogin}
                className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-red-500/50 hover:-translate-y-0.5"
                >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                <span>LOGIN</span>
                </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden mr-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-red-500 hover:bg-gray-800/50 focus:outline-none transition-all duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-6 border-t border-gray-700 bg-gradient-to-b from-gray-900 to-black shadow-2xl">
            {/* Mobile Navigation Links */}
            <nav className="grid grid-cols-2 gap-3 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center py-4 px-4 text-white hover:text-red-500 hover:bg-gray-800/50 font-semibold rounded-lg transition-all duration-200 border-2 border-gray-700 hover:border-red-600 group"
                >
                  <span className="text-sm">{link.name}</span>
                </Link>
              ))}
            </nav>

            {/* Auth Section in Mobile Menu */}
            {isAuthenticated ? (
              <div className="mt-6 pt-6 px-4 border-t border-gray-700">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition-all duration-200 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>LOGOUT</span>
                </button>
              </div>
            ) : (
              <div className="mt-6 pt-6 px-4 border-t border-gray-700">
                <button
                  onClick={() => {
                    handleLogin();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition-all duration-200 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>SIGN IN</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom accent bar - Full width, same as top */}
      <div className="h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 w-full"></div>
    </nav>
  );
};

export default Navbar;
