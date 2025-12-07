import React from 'react';
import Collections from '../components/Collections';
import MobileBottomNav from '../components/MobileBottomNav';
import HeroSlider from '../components/HeroSlider';

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

  return (
    <div className="min-h-screen pt-0 pb-16 sm:pb-20 md:pb-0 w-full overflow-x-hidden">
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

      {/* Car Images Grid - Responsive */}
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 px-1 sm:px-2 md:px-3 lg:px-4 bg-gradient-to-b from-gray-50 to-white w-full">
        <div className="w-full">
          {/* Responsive Heading */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-2 sm:px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-center mb-2 sm:mb-3 text-black overflow-hidden" style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '1px' }}>
              <span className="inline-block">PREMIUM TOY CAR COLLECTION</span>
            </h2>
          </div>
          
          {/* Responsive Grid - Full Width */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-5 w-full px-1 sm:px-2">
            {carData.map((car, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-md sm:rounded-lg bg-white shadow-sm sm:shadow-md hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 w-full"
              >
                {/* Responsive Image Container */}
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
                
                {/* Responsive Card Label */}
                <div className="p-2 sm:p-3 md:p-4 bg-white">
                  <h3 className="text-gray-900 font-semibold text-xs sm:text-sm md:text-base text-center leading-tight line-clamp-2">
                    {car.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default Home;
