import React from 'react';
import MobileBottomNav from '../components/MobileBottomNav';
import HeroSlider from '../components/HeroSlider';
import { FaTruck, FaAward, FaShieldAlt, FaUndo } from 'react-icons/fa';

const Home = () => {
  const carData = [
    { 
      image: 'https://res.cloudinary.com/duc9svg7w/image/upload/v1765122010/unnamed_caprdy.jpg',
      name: 'Mercedes G-Wagen'
    },
    { 
      image: 'https://res.cloudinary.com/duc9svg7w/image/upload/v1765121988/unnamed_p8lncd.jpg',
      name: 'Toyota Land Cruiser'
    },
    { 
      image: 'https://res.cloudinary.com/duc9svg7w/image/upload/v1765121984/unnamed_mbrcnr.jpg',
      name: 'Jeep Wrangler Rubicon'
    },
    { 
      image: 'https://res.cloudinary.com/duc9svg7w/image/upload/v1765121947/unnamed_xgpvmu.jpg',
      name: 'Red Monster Truck'
    },
    { 
      image: 'https://res.cloudinary.com/duc9svg7w/image/upload/v1765121942/unnamed_ovmhwq.jpg',
      name: 'Green Tractor'
    },
    { 
      image: 'https://res.cloudinary.com/duc9svg7w/image/upload/v1765121931/unnamed_qvw8so.jpg',
      name: 'Red Tractor'
    },
    { 
      image: 'https://res.cloudinary.com/duc9svg7w/image/upload/v1765121905/unnamed_qrxuh1.jpg',
      name: 'Blue Monster Truck'
    },
    { 
      image: 'https://res.cloudinary.com/duc9svg7w/image/upload/v1765121883/unnamed_tk2axz.jpg',
      name: 'Sports Car'
    },
  ];

  // New Arrivals - Recommended image size: 800x500px to 1200x750px (aspect ratio 1.6:1)
  // Card image container heights: Mobile: 256px (h-64), Small: 288px (h-72), Medium+: 320px (h-80)
  const newArrivals = [
    { image: 'https://res.cloudinary.com/duc9svg7w/image/upload/v1765174818/unnamed_dvdll4.jpg', name: 'Razor X-900 SuperSport ', price: '₹899' },
    { image: 'https://res.cloudinary.com/duc9svg7w/image/upload/v1765121875/unnamed_oijrw8.jpg', name: 'Prestige Royale X ', price: '₹1,299' },
    { image: 'https://res.cloudinary.com/duc9svg7w/image/upload/v1765175919/unnamed_xyvgk6.jpg', name: 'MegaMover Transporter ', price: '₹999' },
  ];

  const categories = [
    { name: 'Bikes', icon: '🚴‍♂️', image: 'https://res.cloudinary.com/duc9svg7w/image/upload/v1765174818/unnamed_dvdll4.jpg' },
    { name: 'SUVs', icon: '🚙', image: 'https://res.cloudinary.com/duc9svg7w/image/upload/v1765174828/unnamed_fniyfi.jpg' },
    { name: 'Monster Trucks', icon: '🚛', image: 'https://res.cloudinary.com/duc9svg7w/image/upload/v1765176679/unnamed_hbal20.jpg' },
    { name: 'Tractors', icon: '🚜', image: 'https://res.cloudinary.com/duc9svg7w/image/upload/v1765176793/unnamed_q2tbba.jpg' },
    { name: 'Sports Cars', icon: '🏎️', image: 'https://res.cloudinary.com/duc9svg7w/image/upload/v1765176903/unnamed_rbilen.jpg' },
    { name: 'HotWheels', icon: '🔥', image: 'https://res.cloudinary.com/duc9svg7w/image/upload/v1765177088/Gemini_Generated_Image_o3flc8o3flc8o3fl_j3z6xs.png' },
  ];

  return (
    <div className="min-h-screen pt-0 pb-16 sm:pb-20 md:pb-0 w-full overflow-x-hidden" style={{ backgroundColor: '#FEF8DD' }}>
      {/* Hero Slider */}
      <HeroSlider
        slides={[
          {
            desktop: 'https://res.cloudinary.com/duc9svg7w/image/upload/v1765018159/1_qlkme2.svg',
            alt: 'TurbooToys - Premium Toy Cars Collection',
          },
          {
            desktop: 'https://res.cloudinary.com/duc9svg7w/image/upload/v1765023447/Black_and_Blue_Modern_Geometric_Car_Dealer_Presentation_2048_x_594_px_frk3zg.png',
            alt: 'Hot Wheels & Toy Collection - TurbooToys',
          },
        ]}
        mobileSrc="https://res.cloudinary.com/duc9svg7w/image/upload/v1765130178/Black_and_Blue_Modern_Geometric_Car_Dealer_Presentation_2048_x_594_px_1080_x_1080_px_xdxyyx.png"
      />

      {/* Shop by Category */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-2 sm:px-4 md:px-6 lg:px-8 w-full" style={{ backgroundColor: '#FEF8DD' }}>
        <div className="w-full">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 px-2 sm:px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black mb-2 sm:mb-3 uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              SHOP BY CATEGORY
            </h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5 px-2 sm:px-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-105">
                  <div className="absolute inset-0 bg-gray-100">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/200x200/1F2937/FFFFFF?text=Car';
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-center mt-3 text-xs sm:text-sm md:text-base font-semibold text-gray-900">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Toy Car Collection */}
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 px-1 sm:px-2 md:px-3 lg:px-4 w-full" style={{ backgroundColor: '#FEF8DD' }}>
        <div className="w-full">
          <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-2 sm:px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center mb-2 sm:mb-3 text-black overflow-hidden uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <span className="inline-block">PREMIUM TOY CAR COLLECTION</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-5 w-full px-2 sm:px-2 md:px-3 lg:px-4">
            {carData.map((car, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-md sm:rounded-lg bg-white shadow-sm sm:shadow-md hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 w-full"
              >
                <div className="relative w-full h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 bg-gray-100 overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-contain sm:object-cover scale-100 sm:scale-[1.02] md:scale-105 group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x500/1F2937/FFFFFF?text=Car+Image';
                    }}
                  />
                </div>
                <div className="p-2 sm:p-3 md:p-4 bg-[#4A4A4D]">
                  <h3 className="text-white font-semibold text-xs sm:text-sm md:text-base text-center leading-tight line-clamp-2">
                    {car.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Zone */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-2 sm:px-4 md:px-6 lg:px-8 w-full" style={{ backgroundColor: '#FEF8DD' }}>
        <div className="w-full">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 px-2 sm:px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black mb-2 sm:mb-3 uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              OFFER ZONE
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">Limited time offers - Don't miss out!</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 px-2 sm:px-4">
            {/* Offer 1: 20% OFF */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-pink-600 to-pink-700"></div>
              <div className="absolute inset-0">
                <img
                  src={categories[0].image}
                  alt="Offer"
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/600/1F2937/FFFFFF?text=Car';
                  }}
                />
              </div>
              <div className="relative p-4 sm:p-5 md:p-6 text-white z-10">
                <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Limited Time</span>
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-1 leading-none">20%</div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">OFF</div>
                <div className="text-sm sm:text-base mb-2 font-semibold opacity-95">Limited Stock</div>
                <p className="text-xs sm:text-sm opacity-90 mb-2">Grab your favorite toy cars before they run out!</p>
                <button className="mt-2 bg-white text-[#02050B] px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-[#02050B] hover:text-white transition-all duration-300 transform group-hover:scale-105">
                  Shop Now →
                </button>
              </div>
              <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            </div>
            
            {/* Offer 2: New Collection */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700"></div>
              <div className="absolute inset-0">
                <img
                  src="https://res.cloudinary.com/duc9svg7w/image/upload/v1765178304/Gemini_Generated_Image_mta0dhmta0dhmta0_ufu40b.png"
                  alt="New Collection"
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/600/1F2937/FFFFFF?text=Car';
                  }}
                />
              </div>
              <div className="relative p-4 sm:p-5 md:p-6 text-white z-10">
                <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">New Arrival</span>
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-black mb-1 leading-none">NEW</div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">Collection</div>
                <div className="text-sm sm:text-base mb-2 font-semibold opacity-95">RC Monster Trucks</div>
                <p className="text-xs sm:text-sm opacity-90 mb-2">Explore our latest remote control vehicles!</p>
                <button className="mt-2 bg-white text-[#02050B] px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-[#02050B] hover:text-white transition-all duration-300 transform group-hover:scale-105">
                  Explore →
                </button>
              </div>
              <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            </div>
            
            {/* Offer 3: Free Shipping */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-green-500 to-teal-600"></div>
              <div className="absolute inset-0">
                <img
                  src="https://res.cloudinary.com/duc9svg7w/image/upload/v1765177088/Gemini_Generated_Image_o3flc8o3flc8o3fl_j3z6xs.png"
                  alt="Free Shipping"
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/600/1F2937/FFFFFF?text=Car';
                  }}
                />
              </div>
              <div className="relative p-4 sm:p-5 md:p-6 text-white z-10">
                <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Special Offer</span>
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-black mb-1 leading-none">FREE</div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">Shipping</div>
                <div className="text-sm sm:text-base mb-2 font-semibold opacity-95">On Orders Above ₹999</div>
                <p className="text-xs sm:text-sm opacity-90 mb-2">Shop more and save on delivery charges!</p>
                <button className="mt-2 bg-white text-[#02050B] px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-[#02050B] hover:text-white transition-all duration-300 transform group-hover:scale-105">
                  Shop Now →
                </button>
              </div>
              <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            </div>
            
            {/* Offer 4: Hot Deals */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600"></div>
              <div className="absolute inset-0">
                <img
                  src={categories[3].image}
                  alt="Hot Deals"
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/600/1F2937/FFFFFF?text=Car';
                  }}
                />
              </div>
              <div className="relative p-4 sm:p-5 md:p-6 text-white z-10">
                <div className="inline-block bg-blue-300/30 backdrop-blur-sm px-3 py-1 rounded-full mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Hot Deals</span>
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-black mb-1 leading-none">30%</div>
                <div className="text-xl sm:text-2xl font-bold mb-1">OFF</div>
                <div className="text-sm sm:text-base mb-2 font-semibold opacity-95">Premium Collection</div>
                <p className="text-xs sm:text-sm opacity-90 mb-2">Best deals on premium toy vehicles!</p>
                <button className="mt-2 bg-white text-blue-700 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-blue-50 transition-all duration-300 transform group-hover:scale-105">
                  Shop Now →
                </button>
              </div>
              <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-2 sm:px-4 md:px-6 lg:px-8 w-full" style={{ backgroundColor: '#FEF8DD' }}>
        <div className="w-full">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 px-2 sm:px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black mb-2 sm:mb-3 uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              NEW ARRIVALS
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5 px-2 sm:px-4">
            {newArrivals.map((item, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative w-full h-64 sm:h-72 md:h-80 bg-gray-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x500/1F2937/FFFFFF?text=Car+Image';
                    }}
                  />
                </div>
                <div className="p-4 sm:p-5 md:p-6 bg-white">
                  <h3 className="text-gray-900 font-semibold text-base sm:text-lg md:text-xl mb-2 text-center">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 font-bold text-lg sm:text-xl md:text-2xl text-center">
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Additional Card - Visible on all screens */}
            <div className="group overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative w-full h-64 sm:h-72 md:h-80 bg-gray-100 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/duc9svg7w/image/upload/v1765176793/unnamed_q2tbba.jpg"
                  alt="New Arrival"
                  className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x500/1F2937/FFFFFF?text=Car+Image';
                  }}
                />
              </div>
              <div className="p-4 sm:p-5 md:p-6 bg-white">
                <h3 className="text-gray-900 font-semibold text-base sm:text-lg md:text-xl mb-2 text-center">
                  Premium Tractor Model
                </h3>
                <p className="text-gray-600 font-bold text-lg sm:text-xl md:text-2xl text-center">
                  ₹1,199
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="hidden md:block py-6 sm:py-8 md:py-10 lg:py-12 w-full" style={{ backgroundColor: '#FEF8DD' }}>
        <div className="w-full">
          <div className="relative w-full overflow-hidden">
            <img
              src="https://res.cloudinary.com/duc9svg7w/image/upload/v1765260272/Untitled_2048_x_594_px_1_abpktn.svg"
              alt="TurbooToys Banner"
              className="w-full h-auto object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/2048x594/1F2937/FFFFFF?text=Banner';
              }}
            />
          </div>
        </div>
      </section>

      {/* Why Choose TurbooToys */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-2 sm:px-4 md:px-6 lg:px-8 w-full" style={{ backgroundColor: '#FEF8DD' }}>
        <div className="w-full">
          <div className="text-center mb-10 sm:mb-12 md:mb-16 px-2 sm:px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black mb-3 sm:mb-4 uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              WHY CHOOSE TURBOOTOYS
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Experience the best in premium toy car collections with unmatched quality and service
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4">
            {/* Fast Delivery */}
            <div className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <FaTruck className="text-2xl text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">Fast Delivery</h3>
                <p className="text-gray-600 text-sm sm:text-base text-center leading-relaxed">Quick and reliable shipping across India with secure packaging</p>
              </div>
            </div>
            
            {/* Premium Quality */}
            <div className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <FaAward className="text-2xl text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">Premium Quality</h3>
                <p className="text-gray-600 text-sm sm:text-base text-center leading-relaxed">Authentic die-cast models with superior craftsmanship and attention to detail</p>
              </div>
            </div>
            
            {/* Authentic Models */}
            <div className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-500 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <FaShieldAlt className="text-2xl text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">Authentic Models</h3>
                <p className="text-gray-600 text-sm sm:text-base text-center leading-relaxed">Genuine licensed products from top brands like Hot Wheels and Matchbox</p>
              </div>
            </div>
            
            {/* Easy Returns */}
            <div className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <FaUndo className="text-2xl text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">Easy Returns</h3>
                <p className="text-gray-600 text-sm sm:text-base text-center leading-relaxed">Hassle-free return policy within 7 days with full refund guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default Home;
